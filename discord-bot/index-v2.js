// discord-parser.js
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { OpenAI } = require('openai');
const axios = require('axios');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- Настройки каналов, которые слушаем
const allowedChannelIds = process.env.LIVE_CHANNEL_IDS
    ? process.env.LIVE_CHANNEL_IDS.split(',').map(id => id.trim())
    : [];

// --- Инициализация Discord клиента
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// --- Хелперы для дат под MySQL DATETIME ---
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
    // Возвращаем строго "YYYY-MM-DD HH:MM:SS"
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

// --- Логирование статуса
client.once('ready', () => {
    console.log(`✅ Бот подключен как ${client.user.tag}`);
    console.log(`📡 Слушаем каналы: ${allowedChannelIds.length ? allowedChannelIds.join(', ') : '(список пуст)'}`);
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

        // Получаем ПЕРВУЮ пользовательскую роль (кроме @everyone)
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
            console.error('❌ Ошибка парсинга JSON от OpenAI:', jsonErr.message);
            console.log('⛔ RAW от AI:\n', raw);
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
        parsed = normalizePayloadDates(parsed, timestampIso);

        console.log('📦 JSON для Laravel (после нормализации дат):');
        console.dir(parsed, { depth: null });

        // Отправляем в Laravel API
        const response = await axios.post(process.env.LARAVEL_API_URL, parsed, {
            timeout: 15000,
            headers: { 'Content-Type': 'application/json' }
        });

        console.log('✅ Успешно импортировано в Laravel API');
        console.dir(response.data, { depth: null });

    } catch (err) {
        if (err.response) {
            console.error(`❌ Ошибка Laravel API (status ${err.response.status}):`);
            console.dir(err.response.data, { depth: null });
        } else {
            console.error('❌ Ошибка:', err.message);
        }
    }
});

// --- Запуск бота
client.login(process.env.DISCORD_TOKEN);
