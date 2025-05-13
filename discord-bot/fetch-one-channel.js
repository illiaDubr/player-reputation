require('dotenv').config();
const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

const CHANNEL_ID = process.env.TARGET_CHANNEL_ID;

client.once('ready', async () => {
    console.log(`✅ Авторизовались как ${client.user.tag}`);

    const channel = await client.channels.fetch(CHANNEL_ID).catch(() => null);
    if (!channel || !channel.isTextBased()) {
        console.error('❌ Канал не найден или не является текстовым');
        process.exit(1);
    }

    const allMessages = [];
    let lastMessageId = null;
    let done = false;

    console.log(`📥 Загрузка истории канала: #${channel.name}`);

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
                timestamp: msg.createdAt.toISOString()
            });
        }

        lastMessageId = messages.last().id;
        console.log(`📦 Получено: ${messages.size}, всего: ${allMessages.length}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const filename = `histor.json`;
    fs.writeFileSync(filename, JSON.stringify(allMessages, null, 2));
    console.log(`✅ История сохранена в ${filename}`);

    client.destroy();
});

client.login(process.env.DISCORD_TOKEN);
