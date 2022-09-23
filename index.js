const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent
    ]
});
const { 
    token, 
    status 
} = require('./config.json');

client.util = require('./util.js');

client.on('warn', err => console.warn('[WARNING]', err));

client.on('error', err => console.error('[ERROR]', err));

client.on('disconnect', () => {
    console.warn('Disconnected.');
    process.exit(0);
});

client.on('uncaughtException', err => {
    console.log('Uncaught Exception: ' + err);
    process.exit(1);
});

client.on('messageCreate', (msg) => {
    if (msg.author.bot) return;
    if (msg.guild) {
            client.util.handleTalk(msg);
    }
})

client.on('ready', () => {
    client.util.handleStatus(client, status);
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('unhandledRejection', (reason) => {
    console.log('[FATAL] Unhandled Rejection: ' + reason);
});

client.login(token);