// discord-parser.js
// npm i cron
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { OpenAI } = require('openai');
const axios = require('axios');
const { CronJob } = require('cron');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- Каналы, которые слушаем
const allowedChannelIds = process.env.LIVE_CHANNEL_IDS
    ? process.env.LIVE_CHANNEL_IDS.split(',').map(id => id.trim())
    : [];

// --- Канал для отчётов и алертов
const REPORT_CHANNEL_ID = process.env.REPORT_CHANNEL_ID || '';
const REPORT_TZ = process.env.REPORT_TZ || 'Europe/Kyiv';
const ALERT_USER_IDS = process.env.ALERT_USER_IDS
    ? process.env.ALERT_USER_IDS.split(',').map(s => s.trim()).filter(Boolean)
    : [];
const REPORT_USE_EMBED = (process.env.REPORT_USE_EMBED ?? '1') !== '0';

// --- Инициализация Discord клиента
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// --- Хранилище для статистики (с сохранением на диск)
const STATE_FILE = path.join(process.cwd(), 'report_state.json');

function defaultState() {
    return {
        sinceIso: new Date().toISOString(),
        totalMessages: 0,        // X — сколько сообщений в каналах с прошлого отчёта
        importedCount: 0,        // Y — сколько записей мы перенесли в БД
        lastImportedText: null,  // W — текст о последней перенесённой записи
        errors: [],              // массив строк/объектов ошибок с момента последнего отчёта
        alertSent: false         // был ли уже отправлен мгновенный алерт до дневного отчёта
    };
}

function loadState() {
    try {
        if (fs.existsSync(STATE_FILE)) {
            const raw = fs.readFileSync(STATE_FILE, 'utf8');
            const st = JSON.parse(raw);
            return { ...defaultState(), ...st };
        }
    } catch (e) {
        console.warn('⚠️ Не удалось прочитать report_state.json, используем состояние по умолчанию:', e.message);
    }
    return defaultState();
}

function saveState(state) {
    try {
        fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
    } catch (e) {
        console.warn('⚠️ Не удалось записать report_state.json:', e.message);
    }
}

let state = loadState();

// --- Хелперы
const truncate = (str, n = 500) =>
    (typeof str === 'string' && str.length > n) ? str.slice(0, n) + '…' : str;

const mentionString = () =>
    ALERT_USER_IDS.length ? ALERT_USER_IDS.map(id => `<@${id}>`).join(' ') : '';

const toMysqlDateTime = (dateLike) => {
    const d = (dateLike instanceof Date) ? dateLike : new Date(dateLike);
    if (isNaN(d.getTime())) return null;
    const pad = (n) => String(n).padStart(2, '0');
    const Y = d.getUTCFullYear();
    const M = pad(d.getUTCMonth() + 1);
    const D = pad(d.getUTCDate());
    const h = pad(d.getUTCHours());
    const m = pad(d.getUTCMinutes());
    const s = pad(d.getUTCSeconds());
    return `${Y}-${M}-${D} ${h}:${m}:${s}`;
};

const normalizePayloadDates = (payload, fallbackIso) => {
    const fallback = toMysqlDateTime(fallbackIso);

    if (Array.isArray(payload.players)) {
        payload.players = payload.players.map(p => ({
            ...p,
            sent_at: toMysqlDateTime(p.sent_at) || fallback,
        }));
    }

    if (Array.isArray(payload.reputation_records)) {
        payload.reputation_records = payload.reputation_records.map(r => ({
            ...r,
            sent_at: toMysqlDateTime(r.sent_at) || fallback,
        }));
    }

    return payload;
};

// ГЛУБОКАЯ нормализация всех ключей sent_at в объекте/массиве
const normalizeAnySentAtDeep = (obj, fallbackIso) => {
    const fallback = toMysqlDateTime(fallbackIso);
    if (obj === null || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
        return obj.map(item => normalizeAnySentAtDeep(item, fallbackIso));
    }

    const out = {};
    for (const [k, v] of Object.entries(obj)) {
        if (k === 'sent_at') {
            out[k] = toMysqlDateTime(v) || fallback;
        } else if (v && typeof v === 'object') {
            out[k] = normalizeAnySentAtDeep(v, fallbackIso);
        } else {
            out[k] = v;
        }
    }
    return out;
};

// Диагностика: остались ли ISO-строки с 'T...Z' после нормализации
const hasIsoWithZ = (payload) => /T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z/.test(JSON.stringify(payload));

// --- Сообщения в канал отчётов
async function sendReportText() {
    const lines = [
        `Кол-во записей в канале с последнего отчета - ${state.totalMessages}`,
        `Кол-во перенесенных записей в базу - ${state.importedCount}`,
        `Последняя перенесенная запись - ${state.lastImportedText ?? '—'}`,
        state.errors.length === 0
            ? 'Ошибок в работе бота не выявлено , все записи перенесены'
            : `Обнаружены ошибки (${state.errors.length}). ${mentionString()}`
    ];
    await sendToReportChannel(lines.join('\n'));
}

function buildReportEmbed() {
    const colorOk = 0x3FB950;     // зелёный
    const colorWarn = 0xDA3633;   // красный
    const hasErrors = state.errors.length > 0;

    const embed = new EmbedBuilder()
        .setTitle('Ежедневный отчёт по боту')
        .setColor(hasErrors ? colorWarn : colorOk)
        .setTimestamp(new Date())
        .addFields(
            { name: 'С отсчёта:', value: new Date(state.sinceIso).toLocaleString('uk-UA', { timeZone: REPORT_TZ }), inline: true },
            { name: 'Сообщений (X):', value: String(state.totalMessages), inline: true },
            { name: 'Импортировано (Y):', value: String(state.importedCount), inline: true },
            { name: 'Последняя запись (W):', value: state.lastImportedText ?? '—', inline: false },
        );

    embed.setDescription(
        state.errors.length === 0
            ? 'Ошибок в работе бота не выявлено, все записи перенесены.'
            : `Обнаружены ошибки (${state.errors.length}).`
    );

    if (state.errors.length > 0) {
        const errPreview = state.errors.slice(-3).map(e =>
            `• ${typeof e === 'string' ? e : (e.message || JSON.stringify(e))}`
        ).join('\n');
        embed.addFields({ name: 'Последние ошибки', value: truncate(errPreview, 1000) });
    }

    return embed;
}

async function sendReportEmbed() {
    const content = state.errors.length > 0 && ALERT_USER_IDS.length
        ? mentionString()
        : undefined;
    await sendToReportChannel({ content, embeds: [buildReportEmbed()] });
}

async function sendToReportChannel(payload) {
    if (!REPORT_CHANNEL_ID) {
        console.warn('⚠️ REPORT_CHANNEL_ID не задан — отчёт/алерт не будет отправлен.');
        return;
    }
    try {
        const channel = await client.channels.fetch(REPORT_CHANNEL_ID);
        if (!channel || !channel.isTextBased?.()) {
            console.warn('⚠️ Канал отчётов не текстовый или недоступен.');
            return;
        }
        await channel.send(typeof payload === 'string' ? { content: payload } : payload);
    } catch (e) {
        console.error('❌ Не удалось отправить сообщение в канал отчётов:', e.message);
    }
}

// --- Мгновенный алерт при первой ошибке
async function sendImmediateAlert(errObj) {
    if (state.alertSent) return; // уже слали алерт до дневного отчёта

    const errText = typeof errObj === 'string'
        ? errObj
        : (errObj?.message || JSON.stringify(errObj));

    const content = [
        '⚠️ Обнаружена ошибка в работе бота!',
        mentionString()
    ].filter(Boolean).join(' ');

    const embed = new EmbedBuilder()
        .setTitle('Алерт: ошибка бота')
        .setColor(0xDA3633)
        .setTimestamp(new Date())
        .setDescription(truncate(errText, 1800))
        .addFields(
            { name: 'С момента отчёта', value: new Date(state.sinceIso).toLocaleString('uk-UA', { timeZone: REPORT_TZ }), inline: true },
            { name: 'Сообщений обработано', value: String(state.totalMessages), inline: true },
            { name: 'Импортировано', value: String(state.importedCount), inline: true }
        );

    await sendToReportChannel({ content, embeds: [embed] });

    state.alertSent = true;
    saveState(state);
}

// --- Ежедневный отчёт и сброс
async function runDailyReport() {
    try {
        if (REPORT_USE_EMBED) {
            await sendReportEmbed();
        } else {
            await sendReportText();
        }

        // Сброс состояния после успешной отправки
        state = {
            sinceIso: new Date().toISOString(),
            totalMessages: 0,
            importedCount: 0,
            lastImportedText: null,
            errors: [],
            alertSent: false
        };
        saveState(state);
        console.log('🧾 Отчёт отправлен и статистика сброшена.');
    } catch (e) {
        console.error('❌ Ошибка при формировании/отправке отчёта:', e.message);
    }
}

// --- Планировщик (ежедневно в 10:00 по REPORT_TZ)
let dailyJob = null;
function initScheduler() {
    try {
        dailyJob = new CronJob(
            '0 10 * * *',     // 10:00 каждый день
            runDailyReport,
            null,
            true,             // start
            REPORT_TZ         // таймзона
        );
        console.log(`🗓 Запущен ежедневный отчёт в 10:00 (${REPORT_TZ}). Канал: ${REPORT_CHANNEL_ID || 'не задан'}`);
    } catch (e) {
        console.error('❌ Не удалось запустить CronJob для отчётов:', e.message);
    }
}

// --- Логирование статуса
client.once('ready', () => {
    console.log(`✅ Бот подключен как ${client.user.tag}`);
    console.log(`📡 Слушаем каналы: ${allowedChannelIds.length ? allowedChannelIds.join(', ') : '(список пуст)'}`);
    initScheduler();
});

// --- Основной обработчик сообщений
client.on('messageCreate', async (message) => {
    try {
        // Игнор ботов и неразрешённых каналов
        if (message.author.bot) return;
        if (allowedChannelIds.length && !allowedChannelIds.includes(message.channel.id)) return;

        const content = message.content?.trim() ?? '';
        const author = message.author?.username ?? 'unknown';
        const timestampIso = message.createdAt?.toISOString?.() ?? new Date().toISOString();
        let roleName = null;

        // Считаем сообщение для отчёта
        state.totalMessages += 1;
        saveState(state);

        // Получаем первую пользовательскую роль (кроме @everyone)
        try {
            const member = await message.guild.members.fetch(message.author.id);
            roleName = member.roles.cache
                .map(role => role.name)
                .find(name => name !== '@everyone') || null;
        } catch {
            console.warn('⚠️ Не удалось получить роли пользователя');
        }

        console.log(`\n📩 Новое сообщение от ${author}: ${content}`);
        if (roleName) console.log(`👑 Роль: ${roleName}`);
        console.log(`🕒 Время ISO: ${timestampIso}`);

        // --- Вызов OpenAI для парсинга в JSON ---
        const aiResponse = await openai.chat.completions.create({
            model: 'gpt-4',
            temperature: 0.3,
            messages: [
                {
                    role: 'system',
                    content: `
Ты интеллектуальный парсер сообщений из Discord. Твоя задача — разобрать текст и превратить его в валидный JSON для Laravel-приложения.

Всегда соблюдай правила:
- Поле "sent_at" ВСЕГДА возвращай в формате MYSQL DATETIME: "YYYY-MM-DD HH:MM:SS" в UTC (без миллисекунд и без таймзоны).
- Логические значения возвращай булевыми (true/false), числа — числовыми.
- Если данных нет — верни строго: { "players": [], "reputation_records": [] }

Доступны входные данные:
- текст сообщения
- роль пользователя (fund_name)
- время отправки (sent_at, это ISO-время)

Формат результата (строго следуй ключам, даже если значения пустые):
{
  "players": [
    {
      "player_id": "уникальный_идентификатор (можно взять из ника)",
      "first_name": "",
      "last_name": "",
      "middle_name": "",
      "email": "",
      "phonenumber": "",
      "Ggpokerok": "",
      "Ggnetwork": "",
      "Pokerstars_com": "",
      "Pokerstars_es": "",
      "Winamax_fr": "",
      "Winamax_es": "",
      "PS": "",
      "GG": "",
      "RedStar": "",
      "TigerGaming": "",
      "PartyPoker": "",
      "Pokerstars": "",
      "888poker": "",
      "WPNpoker": "",
      "Stretchpoker": "",
      "Coinpoker": "",
      "chikoPoker": "",
      "nickiPoker": "",
      "Skrill": "",
      "Neteller": "",
      "GipsyTeam": "",
      "Luxon": "",
      "telegram": "",
      "discord": "",
      "skype": "",
      "backer_tag": "",
      "kyc_status": false,
      "sent_at": "время отправки в формате YYYY-MM-DD HH:MM:SS (UTC)"
    }
  ],
  "reputation_records": [
    {
      "player_id": "",
      "backer_id": 1,
      "fund_name": "название первой роли пользователя",
      "comment": "",
      "damage": "",
      "makeUp": "",
      "source": "discord",
      "sent_at": "время отправки в формате YYYY-MM-DD HH:MM:SS (UTC)"
    }
  ]
}
          `.trim()
                },
                {
                    role: 'user',
                    content: `Сообщение: "${content}"\nРоль: "${roleName ?? 'неизвестна'}"\nВремя (ISO): "${timestampIso}"`
                }
            ]
        });

        const raw = aiResponse?.choices?.[0]?.message?.content ?? '';
        let parsed;

        try {
            parsed = JSON.parse(raw);
        } catch (jsonErr) {
            const msg = `OpenAI JSON parse error: ${jsonErr.message}. RAW: ${truncate(raw, 400)}`;
            console.error('❌', msg);
            state.errors.push({ at: new Date().toISOString(), message: msg });
            saveState(state);
            // Мгновенный алерт при ПЕРВОЙ ошибке
            await sendImmediateAlert(msg);
            return;
        }

        // Если пусто — ничего не отправляем
        const noPlayers = !parsed.players || parsed.players.length === 0;
        const noReps = !parsed.reputation_records || parsed.reputation_records.length === 0;
        if (noPlayers && noReps) {
            console.log('⏭️ Пропуск — нет данных для импорта');
            return;
        }

        // Гарантируем корректный формат дат перед POST
        // 1) Нормализация старым способом (плоские уровни players/reputation_records)
        parsed = normalizePayloadDates(parsed, timestampIso);

// 2) ГЛУБОКАЯ нормализация на весь объект (любой sent_at в любом месте)
        parsed = normalizeAnySentAtDeep(parsed, timestampIso);

// 3) Проверка: если всё ещё где-то есть ISO с Z — нормализуем повторно (на случай мутаций)
        if (hasIsoWithZ(parsed)) {
            console.warn('⚠️ Найден ISO с Z после нормализации — выполняю повторную глубокую нормализацию.');
            parsed = normalizeAnySentAtDeep(parsed, timestampIso);
        }



        console.log('📦 JSON для Laravel (после нормализации дат):');
        console.dir(parsed, { depth: null });

        // Отправляем в Laravel API
        const response = await axios.post(process.env.LARAVEL_API_URL, parsed, {
            timeout: 15000,
            headers: { 'Content-Type': 'application/json' }
        });

        console.log('✅ Успешно импортировано в Laravel API');
        console.dir(response.data, { depth: null });

        // Обновляем статистику перенесённых записей
        const importedItems = [];
        if (Array.isArray(parsed.players)) {
            for (const p of parsed.players) {
                importedItems.push({
                    type: 'player',
                    id: p.player_id || p.discord || p.telegram || '(без id)',
                    when: p.sent_at || toMysqlDateTime(timestampIso)
                });
            }
        }
        if (Array.isArray(parsed.reputation_records)) {
            for (const r of parsed.reputation_records) {
                importedItems.push({
                    type: 'reputation',
                    id: r.player_id || '(без player_id)',
                    when: r.sent_at || toMysqlDateTime(timestampIso)
                });
            }
        }

        if (importedItems.length > 0) {
            const last = importedItems[importedItems.length - 1];
            state.lastImportedText =
                `${last.type === 'player' ? 'Игрок' : 'Реп.запись'}: ${last.id} @ ${last.when}`;
            state.importedCount += importedItems.length;
            saveState(state);
        }

    } catch (err) {
        if (err.response) {
            const msg = `Laravel API error ${err.response.status}: ${truncate(JSON.stringify(err.response.data), 500)}`;
            console.error('❌', msg);
            state.errors.push({ at: new Date().toISOString(), message: msg });
            saveState(state);
            await sendImmediateAlert(msg);
        } else {
            const msg = `Unhandled error: ${err.message}`;
            console.error('❌', msg);
            state.errors.push({ at: new Date().toISOString(), message: msg });
            saveState(state);
            await sendImmediateAlert(msg);
        }
    }
});

// --- Запуск бота
client.once('ready', () => {
    // уже есть вверху, но оставим для совместимости
});
client.login(process.env.DISCORD_TOKEN);
