require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { OpenAI } = require('openai');
const axios = require('axios');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

    const content = message.content;
    const author = message.author.username;
    const timestamp = message.createdAt.toISOString();
    let roleName = null;

    try {
        const member = await message.guild.members.fetch(message.author.id);


        roleName = member.roles.cache.map(role => role.name).find(name => name !== '@everyone') || null;
    } catch {
        console.warn('⚠️ Не удалось получить роли пользователя');
    }

    console.log(`📩 Новое сообщение от ${author}: ${content}, ${timestamp}`);
    if (roleName) console.log(`👑 Роль пользователя: ${roleName}`);

    try {

        // Отправляем сообщение в OpenAI
        const aiResponse = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: `Ты интеллектуальный парсер сообщений из Discord. Твоя задача — разобрать текст и превратить его в валидный JSON для Laravel-приложения. \\n' +
                       
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
                        '      "fund_name": " Используй первую роль пользователя в которой название фонда",' 
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
                    content: `Сообщение из Discord: "${content}". Роль пользователя: "${roleName ?? 'неизвестна'}". Время отправки: ${timestamp}`

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
            console.log('⛔ RAW ответ OpenAI:\n', raw);
            return;
        }

        console.log('📦 Подготовленные данные для Laravel:');
        console.dir(parsed, { depth: null });

        const response = await axios.post(process.env.LARAVEL_API_URL, parsed);

        console.log('✅ Успешно отправлено в Laravel API:');
        console.log(response.data);

    } catch (err) {
        if (err.response) {
            console.error('❌ Ошибка от Laravel API (status ' + err.response.status + '):');
            console.dir(err.response.data, { depth: null });
        } else {
            console.error('❌ Ошибка отправки:', err.message);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);