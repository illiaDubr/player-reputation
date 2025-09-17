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
    ? process.env.LIVE_CHANNEL_IDS.split(',').map(id => id.trim()).filter(Boolean)
    : [];

// --- Канал для отчётов и алертов
const REPORT_CHANNEL_ID = process.env.REPORT_CHANNEL_ID || '';
const REPORT_TZ = process.env.REPORT_TZ || 'Europe/Kyiv';
const ALERT_USER_IDS = process.env.ALERT_USER_IDS
    ? process.env.ALERT_USER_IDS.split(',').map(s => s.trim()).filter(Boolean)
    : [];
const REPORT_USE_EMBED = (process.env.REPORT_USE_EMBED ?? '1') !== '0';

// --- Discord клиент
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// --- Состояние с диском
const STATE_FILE = path.join(process.cwd(), 'report_state.json');

function defaultState() {
    return {
        sinceIso: new Date().toISOString(),
        // Счётчики
        totalMessages: 0,          // X — всего сообщений, увиденных ботом
        importedMessages: 0,       // Y — сообщений, в которых был импорт (1 сообщение = 1)
        importedPlayers: 0,        // суммарно добавлено игроков
        importedReps: 0,           // суммарно добавлено реп.записей
        lastImportedText: null,    // подпись о последней записи
        errors: [],                // последние ошибки
        alertSent: false,          // отправлялся ли алерт с момента отчёта
        processedMessageIds: []    // защита от повторной обработки (кольцевой буфер)
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
        console.warn('⚠️ Не удалось прочитать report_state.json, используем дефолт:', e.message);
    }
    return defaultState();
}

function saveState(next) {
    try {
        fs.writeFileSync(STATE_FILE, JSON.stringify(next, null, 2), 'utf8');
    } catch (e) {
        console.warn('⚠️ Не удалось записать report_state.json:', e.message);
    }
}

let state = loadState();

// --- Хелперы
const truncate = (str, n = 500) =>
    typeof str === 'string' && str.length > n ? str.slice(0, n) + '…' : str;

const mentionString = () =>
    ALERT_USER_IDS.length ? ALERT_USER_IDS.map(id => `<@${id}>`).join(' ') : '';

const toMysqlDateTime = (dateLike) => {
    const d = (dateLike instanceof Date) ? dateLike : new Date(dateLike);
    if (isNaN(d.getTime())) return null;
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
};

const normalizeAnySentAtDeep = (obj, fallbackIso) => {
    const fallback = toMysqlDateTime(fallbackIso);
    if (obj === null || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) return obj.map(v => normalizeAnySentAtDeep(v, fallbackIso));

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

const hasIsoWithZ = (payload) =>
    /T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z/.test(JSON.stringify(payload));

// защита от повторной обработки одного и того же сообщения
function alreadyProcessed(messageId) {
    return state.processedMessageIds.includes(messageId);
}
function markProcessed(messageId) {
    if (!messageId) return;
    state.processedMessageIds.push(messageId);
    // ограничим буфер, чтобы файл не разрастался
    if (state.processedMessageIds.length > 2000) {
        state.processedMessageIds = state.processedMessageIds.slice(-1500);
    }
    saveState(state);
}

// --- Сообщения в канал отчётов
async function sendReportText() {
    const lines = [
        `С отсчёта: ${new Date(state.sinceIso).toLocaleString('uk-UA', { timeZone: REPORT_TZ })}`,
        `Сообщений (X): ${state.totalMessages}`,
        `Импортировано сообщений (Y): ${state.importedMessages}`,
        `Игроков: ${state.importedPlayers} · Реп.записей: ${state.importedReps}`,
        `Последняя запись: ${state.lastImportedText ?? '—'}`,
        state.errors.length === 0
            ? 'Ошибок в работе бота не выявлено.'
            : `Обнаружены ошибки (${state.errors.length}). ${mentionString()}`
    ];
    await sendToReportChannel(lines.join('\n'));
}

function buildReportEmbed() {
    const hasErrors = state.errors.length > 0;
    const embed = new EmbedBuilder()
        .setTitle('Ежедневный отчёт по боту')
        .setColor(hasErrors ? 0xDA3633 : 0x3FB950)
        .setTimestamp(new Date())
        .addFields(
            { name: 'С отсчёта', value: new Date(state.sinceIso).toLocaleString('uk-UA', { timeZone: REPORT_TZ }), inline: true },
            { name: 'Сообщений (X)', value: String(state.totalMessages), inline: true },
            { name: 'Импортировано сообщений (Y)', value: String(state.importedMessages), inline: true },
            { name: 'Игроков / Реп.записей', value: `${state.importedPlayers} / ${state.importedReps}`, inline: true },
            { name: 'Последняя запись', value: state.lastImportedText ?? '—', inline: false },
        )
        .setDescription(hasErrors
            ? `Обнаружены ошибки (${state.errors.length}).`
            : 'Ошибок в работе бота не выявлено.');

    if (hasErrors) {
        const errPreview = state.errors.slice(-3).map(e =>
            `• ${typeof e === 'string' ? e : (e.message || JSON.stringify(e))}`
        ).join('\n');
        embed.addFields({ name: 'Последние ошибки', value: truncate(errPreview, 1000) });
    }
    return embed;
}

async function sendReportEmbed() {
    const content = state.errors.length > 0 && ALERT_USER_IDS.length ? mentionString() : undefined;
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
    if (state.alertSent) return;
    const errText = typeof errObj === 'string' ? errObj : (errObj?.message || JSON.stringify(errObj));

    const embed = new EmbedBuilder()
        .setTitle('Алерт: ошибка бота')
        .setColor(0xDA3633)
        .setTimestamp(new Date())
        .setDescription(truncate(errText, 1800))
        .addFields(
            { name: 'С момента отчёта', value: new Date(state.sinceIso).toLocaleString('uk-UA', { timeZone: REPORT_TZ }), inline: true },
            { name: 'Сообщений (X)', value: String(state.totalMessages), inline: true },
            { name: 'Импортировано сообщений (Y)', value: String(state.importedMessages), inline: true }
        );

    const content = ['⚠️ Обнаружена ошибка в работе бота!', mentionString()].filter(Boolean).join(' ');
    await sendToReportChannel({ content, embeds: [embed] });

    state.alertSent = true;
    saveState(state);
}

// --- Ежедневный отчёт и сброс
async function runDailyReport() {
    try {
        if (REPORT_USE_EMBED) await sendReportEmbed();
        else await sendReportText();

        // Сброс состояния после успешной отправки
        state = {
            sinceIso: new Date().toISOString(),
            totalMessages: 0,
            importedMessages: 0,
            importedPlayers: 0,
            importedReps: 0,
            lastImportedText: null,
            errors: [],
            alertSent: false,
            processedMessageIds: state.processedMessageIds.slice(-1500) // не теряем базу id
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
        dailyJob = new CronJob('0 10 * * *', runDailyReport, null, true, REPORT_TZ);
        console.log(`🗓 Ежедневный отчёт в 10:00 (${REPORT_TZ}). Канал: ${REPORT_CHANNEL_ID || 'не задан'}`);
    } catch (e) {
        console.error('❌ Не удалось запустить CronJob:', e.message);
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

        // Защита от повторов по message.id
        if (alreadyProcessed(message.id)) {
            console.log(`⏭️ Повтор сообщения ${message.id} — пропуск импорта/счётчиков.`);
            return;
        }

        const content = message.content?.trim() ?? '';
        const author = message.author?.username ?? 'unknown';
        const timestampIso = message.createdAt?.toISOString?.() ?? new Date().toISOString();

        // Считаем входящее сообщение
        state.totalMessages += 1;
        saveState(state);

        // Роль (первая пользовательская, кроме @everyone)
        let roleName = null;
        try {
            const member = await message.guild.members.fetch(message.author.id);
            roleName = member.roles.cache.map(r => r.name).find(n => n !== '@everyone') || null;
        } catch {
            console.warn('⚠️ Не удалось получить роли пользователя');
        }

        console.log(`\n📩 Сообщение от ${author}: ${content}`);
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
Ты интеллектуальный парсер сообщений из Discord. Верни ВАЛИДНЫЙ JSON.
Требования:
- Всегда возвращай "sent_at" в формате MYSQL DATETIME "YYYY-MM-DD HH:MM:SS" (UTC).
- Булевы — как true/false, числа — числовыми.
- Если данных нет — строго {"players":[],"reputation_records":[]}.
Формат результата:
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
      "sent_at": "время отправки"
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
      "sent_at": "время отправки"
    }
  ]
}

Если данных нет — верни: { "players": [], "reputation_records": [] }
Никаких пояснений, только JSON.
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
            await sendImmediateAlert(msg);
            return;
        }

        const hasPlayers = Array.isArray(parsed.players) && parsed.players.length > 0;
        const hasReps = Array.isArray(parsed.reputation_records) && parsed.reputation_records.length > 0;
        if (!hasPlayers && !hasReps) {
            console.log('⏭️ Пропуск — нет данных для импорта');
            // отметим сообщение как обработанное, чтобы не пытаться снова
            markProcessed(message.id);
            return;
        }

        // Нормализация дат
        parsed = normalizeAnySentAtDeep(parsed, timestampIso);
        if (hasIsoWithZ(parsed)) parsed = normalizeAnySentAtDeep(parsed, timestampIso);

        console.log('📦 JSON для Laravel (после нормализации дат):');
        console.dir(parsed, { depth: null });

        // Отправляем в Laravel API
        const response = await axios.post(process.env.LARAVEL_API_URL, parsed, {
            timeout: 15000,
            headers: { 'Content-Type': 'application/json' }
        });

        console.log('✅ Успешно импортировано в Laravel API');
        console.dir(response.data, { depth: null });

        // Обновляем статистику (БЕЗ удвоений — 1 сообщение = максимум +1 к importedMessages)
        const playersN = parsed.players?.length ?? 0;
        const repsN = parsed.reputation_records?.length ?? 0;

        state.importedMessages += 1;
        state.importedPlayers += playersN;
        state.importedReps += repsN;

        // Последняя запись — берём приоритетно репутацию, иначе игрока
        const lastWhen = parsed.reputation_records?.at(-1)?.sent_at
            || parsed.players?.at(-1)?.sent_at
            || toMysqlDateTime(timestampIso);
        const lastId = parsed.reputation_records?.at(-1)?.player_id
            || parsed.players?.at(-1)?.player_id
            || '(id неизвестен)';
        state.lastImportedText = `${repsN ? 'Реп.запись' : 'Игрок'}: ${lastId} @ ${lastWhen}`;

        // Помечаем сообщение как обработанное (анти-дубль)
        markProcessed(message.id);
        saveState(state);

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
client.login(process.env.DISCORD_TOKEN);
