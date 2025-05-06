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

const CHANNEL_IDS = process.env.CHANNEL_IDS.split(',').map(id => id.trim());
const allMessages = [];

client.once('ready', async () => {
    console.log(`✅ Авторизовались как ${client.user.tag}`);

    for (const channelId of CHANNEL_IDS) {
        const channel = await client.channels.fetch(channelId).catch(() => null);
        if (!channel || !channel.isTextBased()) {
            console.warn(`⚠️ Пропущен канал ${channelId} — не текстовый или не найден`);
            continue;
        }

        console.log(`📥 Начинаем загрузку из канала #${channel.name} (${channel.id})`);

        let lastMessageId = null;
        let done = false;

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
    }

    fs.writeFileSync('history.json', JSON.stringify(allMessages, null, 2));
    console.log('✅ История сохранена в history.json');

    client.destroy();
});

client.login(process.env.DISCORD_TOKEN);
