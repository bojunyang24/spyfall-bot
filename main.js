const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

const prefix = '-';

client.commands = new Discord.Collection();

// import command files
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command)
}

client.once('ready', () => {
  console.log('Buttbot is online');
});

// map commands to execution logic
client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message
    .content
    .slice(prefix.length)
    .split(/ +/);

  const command = args
    .shift()
    .toLowerCase();

  switch (command) {
    case 'succ?':
      client.commands.get('has_bot_role').execute(message, args);
      break;
    case 'succme':
      client.commands.get('get_bot_role').execute(message, args);
      break;
    case 'unsucc':
      client.commands.get('remove_bot_role').execute(message, args);
      break;
    default:
      break;
  }
});

// get bot token from config
fs.readFile('./discord_config.json', (err, jsonString) => {
  if (err) {
    console.log('parsing json failed with error: ', err);
  }
  discord_config = JSON.parse(jsonString);
  client.login(discord_config.bot_token);
});