require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
const axios = require('axios');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const CHANNEL_KEYS = ['PLAYERS_ON_PAUSE', 'PLAYERS_ON_PAUSEV2'];

async function processMessage(message) {
    try {
        const content = message.content;
        const timestamp = message.timestamp;
        const roleName = message.roles?.[0] ?? null;

        if (!content) return;

        console.log(`📨 Обработка: "${content}"`);

        const aiResponse = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: `
Ты интеллектуальный парсер сообщений из Discord. Твоя задача — разобрать текст и превратить его в валидный JSON для Laravel-приложения.

Формат вывода:
{
  "players": [
    {
      "player_id": "генерируй на используй 1 из ников игрока",
      ...
      "backer_tag": "PlayerOnPause",
      "kyc_status": false
    }
  ],
  "reputation_records": [
    {
      "player_id": "",
      "backer_id": 1,
      "fund_name": "Используй первую роль пользователя в которой название фонда",
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
      "backer_tag": "PlayerOnPause",
      "kyc_status": false
    }
  ],
  "reputation_records": [
    {
      "player_id": "",
      "backer_id": 1,
      "fund_name": "Используй первую роль пользователя в которой название фонда",
      "comment": "",
      "damage": "",
      "makeUp": "",
      "backer_tag": "PlayerOnPause",
      "kyc_status": false
    }
  ],
  "reputation_records": [
    {
      "player_id": "",
      "backer_id": 1,
      "fund_name": "Используй первую роль пользователя в которой название фонда",
      ...
      "source": "discord"
    }
  ]
}

Если сообщение не содержит нужных данных — верни:
{ "players": [], "reputation_records": [] }

Не добавляй никакого текста, пояснений или описаний. Только валидный JSON.
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
        } catch (e) {
            console.error('❌ Ошибка парсинга JSON:\n', raw);
            return;
        }

        if (
            (!parsed.players || parsed.players.length === 0) &&
            (!parsed.reputation_records || parsed.reputation_records.length === 0)
        ) {
            console.log('⏭️ Пропуск — пустой результат\n');
            return;
        }

        const response = await axios.post(process.env.LARAVEL_API_URL, parsed);
        console.log('✅ Импортировано\n');

    } catch (err) {
        if (err.response) {
            console.error('❌ Ошибка Laravel API:', err.response.data);
        } else {
            console.error('❌ Ошибка:', err.message);
        }
    }
}

async function processAllMessages() {
    for (const key of CHANNEL_KEYS) {
        const filePath = path.join(__dirname, `history_${key.toLowerCase()}.json`);
        if (!fs.existsSync(filePath)) {
            console.warn(`⚠️ Файл ${filePath} не найден — пропускаем`);
            continue;
        }

        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        console.log(`📂 Обработка файла: ${filePath}`);

        for (const message of data) {
            await processMessage(message);
            await new Promise(resolve => setTimeout(resolve, 1500));
        }
    }

    console.log('🎉 Обработка всех каналов завершена!');
}

processAllMessages();
