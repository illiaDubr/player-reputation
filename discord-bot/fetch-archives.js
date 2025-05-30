require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits } = require('discord.js');

const CHANNEL_ENV_KEYS = [
    'PULL_OF_PROBLEMATIC_PLAYERS',
    'PLAYERS_ON_PAUSE',
    'PUBLICATION_OF_ARBITRATIONS',
    'PUBLICATION_OF_REHABILITATED_PLAYERS',
    'PULL_OF_PROBLEMATIC_PLAYERSV2',
    'PLAYERS_ON_PAUSEV2',
    'PUBLICATION_OF_ARBITRATIONSV2',
    'PUBLICATION_OF_REHABILITATED_PLAYERSV2',
];

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

client.once('ready', async () => {
    console.log(`✅ Авторизовались как ${client.user.tag}`);

    for (const key of CHANNEL_ENV_KEYS) {
        const channelId = process.env[key];
        if (!channelId) {
            console.warn(`⚠️ Переменная ${key} не найдена`);
            continue;
        }

        const channel = await client.channels.fetch(channelId).catch(() => null);
        if (!channel || !channel.isTextBased()) {
            console.warn(`⚠️ Пропущен канал ${key} (${channelId}) — не текстовый или не найден`);
            continue;
        }

        const allMessages = [];
        let lastMessageId = null;
        let done = false;

        console.log(`📥 Загружаем из канала #${channel.name} (${channel.id})`);

        while (!done) {
            const options = { limit: 100 };
            if (lastMessageId) options.before = lastMessageId;

            const messages = await channel.messages.fetch(options);
            if (messages.size === 0) {
                done = true;
                break;
            }

            for (const msg of messages.values()) {
                const member = await channel.guild.members.fetch(msg.author.id).catch(() => null);
                const roles = member ? member.roles.cache.map(role => role.name) : [];

                allMessages.push({
                    id: msg.id,
                    author: msg.author.username,
                    roles,
                    content: msg.content,
                    timestamp: msg.createdAt.toISOString(),
                });
            }

            lastMessageId = messages.last().id;
            console.log(`📦 Получено: ${messages.size}, всего: ${allMessages.length}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        const filename = `history_${key.toLowerCase()}.json`;
        fs.writeFileSync(path.join(__dirname, filename), JSON.stringify(allMessages, null, 2));
        console.log(`✅ Сохранено в ${filename}`);
    }

    client.destroy();
});

client.login(process.env.DISCORD_TOKEN);
