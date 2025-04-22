require('dotenv').config();
const fs = require('fs');
const { OpenAI } = require('openai');
const axios = require('axios');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function processMessage(message) {
    try {
        const content = message.content;
        if (!content) return;

        console.log(`📨 Обработка сообщения: "${content}"`);

        const aiResponse = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `
Ты помощник, который структуриТы интеллектуальный парсер сообщений из Discord. Твоя задача — разобрать текст и превратить его в валидный JSON для Laravel-приложения. \\n' +
                       
                        'Используй строго эти структуры:
                       
                        '1. Таблица \`players\`:
                     
                        '{
                        '  "players": [
                        '    {
                        '      "player_id": "уникальный_идентификатор",
                        '      "first_name": "",
                        '      "last_name": "",
                        '      "middle_name": "",
                        '      "email": "",
                        '      "phonenumber": "",
                        '      "Ggpokerok": "",
                        '      "Pokerstars": "",
                        '      "Ggpokerok",
                         "Ggnetwork",
                          "Pokerstars_com",
                           "Pokerstars_es", 
                           "Winamax_fr", 
                           "Winamax_es",
                            "PS",
                             "GG",
                       "RedStar",
                      "TigerGaming",
                     "PartyPoker",
                    "Pokerstars",
                     "888poker",
                     "WPNpoker", 
                     "Stretchpoker",
                     "Coinpoker",
                     "chikoPoker",
                     "nickiPoker", 
                    "Skrill",
                      "Neteller",
                           "GipsyTeam",
                                         "Luxon":
                        '      "telegram": "",
                        '      "discord": "",
                        '      "skype": "",
                        '      "backer_tag": " 1. **arbitrage**  
   - Если в \`case.amount\` есть любая сумма > 0 (то есть есть финансовая претензия).

2. **MultiArbitrage**  
   - Если у игрока **больше одной** записи в \`case\`, и **каждая** (или хотя бы несколько) содержит \`amount\` > 0 (то есть несколько финансовых претензий).

3. **ExArbitrage**  
   - Если есть явное указание, что долг уже погашен (например, в \`case.descr\` упоминается «долг выплачен», «расчитался», «закрыл долг» и т. п.).  
   - В этом случае ставь \`ExArbitrage\`, даже если раньше была финансовая претензия.

4. **ProblematicPlayer**  
   - Если нет финансовых претензий (\`amount\` > 0) и нет упоминания о погашенных долгах, но есть негативные факты: нарушение условий, грубое поведение, негативные отзывы и т. п.

5. **PlayerOnPause**  
   - Если нет финансовых претензий и нет погашенных долгов, но в \`case.descr\` сказано, что игрок взял паузу, временно прекратил игру, собирается вернуться и т. п.

6. **no tag**  
   - Если ни один из критериев выше не подхо
                        '      
                        '2. Таблица \`reputation_records
                        '  "reputation_records": [\\n' +
                        '      "player_id": "", 
                        '      "backer_id": 1, 
                        '      "fund_name": "",' 
                        '      "comment": "", 
                        '      "damage": "",
                        '      "makeUp": "", 
                        '      "source": "discord"
                        'Если сообщение не содержит нужных данных — 
                        '\`\`
                        '{ "players": [], "reputation_records": [] }\\n' +
                        'Не пиши никакого текста, только валидный JSON. Не включай лишние поля. Формируй значения по содержанию текста, если они явно указаны. Игнорируй неопознанные слова
          `
                },
                {
                    role: 'user',
                    content: content
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
            console.log('⏭️ Пропуск — нет данных для импорта\n');
            return;
        }

        const response = await axios.post(process.env.LARAVEL_API_URL, parsed);
        console.log('✅ Импортировано в Laravel\n');

    } catch (err) {
        if (err.response) {
            console.error('❌ Ошибка Laravel API:', err.response.data);
        } else {
            console.error('❌ Ошибка:', err.message);
        }
    }
}

async function processAllMessages() {
    const data = JSON.parse(fs.readFileSync('history.json', 'utf-8'));

    for (const message of data) {
        await processMessage(message);
        await new Promise(resolve => setTimeout(resolve, 1500)); // пауза между запросами
    }

    console.log('🎉 Обработка завершена!');
}

processAllMessages();
