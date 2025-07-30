require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { OpenAI } = require('openai');
const axios = require('axios');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Массив ID каналов, которые слушаем

const allowedChannelIds = process.env.LIVE_CHANNEL_IDS.split(',').map(id => id.trim());


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', () => {
    console.log(`✅ Бот подключен как ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!allowedChannelIds.includes(message.channel.id)) return;

    const content = message.content;
    const author = message.author.username;
    const timestamp = message.createdAt.toISOString();
    let roleName = null;

    try {
        const member = await message.guild.members.fetch(message.author.id);
        roleName = member.roles.cache
            .map(role => role.name)
            .find(name => name !== '@everyone') || null;
    } catch {
        console.warn('⚠️ Не удалось получить роли пользователя');
    }

    console.log(`📩 Новое сообщение от ${author}: ${content}`);
    if (roleName) console.log(`👑 Роль: ${roleName}`);
    console.log(`🕒 Время: ${timestamp}`);

    try {
        const aiResponse = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: `
 Ты интеллектуальный парсер сообщений из Discord. Твоя задача — разобрать текст и превратить его в валидный JSON для Laravel-приложения.
 Доступны:
 - текст сообщения
 - роль пользователя (fund_name)
 - время отправки (sent_at)
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
                    content: `Сообщение: "${content}"\nРоль: "${roleName ?? 'неизвестна'}"\nВремя: "${timestamp}"`
                }
            ],
            temperature: 0.3
        });

        const raw = aiResponse.choices[0].message.content;
        let parsed;

        try {
            parsed = JSON.parse(raw);
        } catch (jsonErr) {
            console.error('❌ Ошибка парсинга JSON от OpenAI:', jsonErr.message);
            console.log('⛔ RAW от AI:\n', raw);
            return;
        }

        if (
            (!parsed.players || parsed.players.length === 0) &&
            (!parsed.reputation_records || parsed.reputation_records.length === 0)
        ) {
            console.log('⏭️ Пропуск — нет данных для импорта');
            return;
        }

        console.log('📦 JSON для Laravel:');
        console.dir(parsed, { depth: null });

        const response = await axios.post(process.env.LARAVEL_API_URL, parsed);
        console.log('✅ Успешно импортировано в Laravel API');
        console.log(response.data);

    } catch (err) {
        if (err.response) {
            console.error(`❌ Ошибка Laravel API (status ${err.response.status}):`);
            console.dir(err.response.data, { depth: null });
        } else {
            console.error('❌ Ошибка:', err.message);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);