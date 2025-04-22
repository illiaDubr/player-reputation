require('dotenv').config();
const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', async () => {
    console.log(`✅ Авторизовались как ${client.user.tag}`);

    const channel = await client.channels.fetch(process.env.CHANNEL_ID);
    if (!channel || !channel.isTextBased()) {
        console.error('❌ Канал не найден или не является текстовым');
        process.exit(1);
    }

    const allMessages = [];
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

        messages.forEach(msg => {
            allMessages.push({
                id: msg.id,
                author: msg.author.username,
                content: msg.content,
                timestamp: msg.createdAt,
            });
        });

        lastMessageId = messages.last().id;
        console.log(`📥 Получено: ${messages.size}, всего: ${allMessages.length}`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // задержка, чтобы избежать rate limit
    }

    fs.writeFileSync('history.json', JSON.stringify(allMessages, null, 2));
    console.log('✅ История сохранена в history.json');

    client.destroy();
});

client.login(process.env.DISCORD_TOKEN);
