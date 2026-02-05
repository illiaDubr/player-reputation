require('dotenv').config();
const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', async () => {
    console.log(`✅ Авторизовались как ${client.user.tag}`);

    // Проверяем, что бот реально видит сервер
    const guild = client.guilds.cache.get(process.env.GUILD_ID);

    if (!guild) {
        console.error('❌ Сервер не найден. Проверь GUILD_ID и что бот добавлен на сервер');
        client.destroy();
        return;
    }

    console.log(`🏠 Сервер: ${guild.name}`);

    // ВАЖНО: fetch именно members, а не guild
    const members = await guild.members.fetch();

    console.log(`👥 Участников найдено: ${members.size}`);

    const data = members.map(member => ({
        id: member.user.id,
        tag: member.user.tag,
        bot: member.user.bot,
        joinedAt: member.joinedAt?.toISOString() ?? null,
        roles: member.roles.cache
            .filter(r => r.name !== '@everyone')
            .map(r => ({
                id: r.id,
                name: r.name
            }))
    }));

    fs.writeFileSync(
        'members.json',
        JSON.stringify(data, null, 2),
        'utf8'
    );

    console.log('✅ Файл members.json успешно создан');

    client.destroy();
});

client.login(process.env.DISCORD_TOKEN);
