// import { Client, Events, GatewayIntentBits } from 'discord.js';

// const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// client.on(Events.ClientReady, readyClient => {
//   console.log(`Logged in as ${readyClient.user.tag}!`);
// });

// client.on(Events.InteractionCreate, async interaction => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === 'ping') {
//     await interaction.reply('Pong!');
//   }
// });

// client.login(TOKEN);



const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on('ready', () => {
    console.log(`Bot online como ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
    // if (message.content === '!ping') {
        message.reply('Pong! 🏓');
    // }
});

client.login(process.env.TOKEN);