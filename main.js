const Discord = require('discord.js');
const client = new Discord.Client();
const commands = require('./commands');
require('dotenv').config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});



client.on('message', msg => {
    const key = msg.content.split(' ')[0];
    if(commands[key] !== undefined) commands[key](msg);
});

client.login(process.env.BOT_TOKEN);
