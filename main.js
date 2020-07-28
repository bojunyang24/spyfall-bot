const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

const prefix = '-';


client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command)
}

client.once('ready', () => {
  console.log('Buttbot is online');
});

client.on('message', message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'unsucc') {
    client.commands.get('unsucc').execute(message, args);
  } else if (command === "succ?") {
    client.commands.get('succ').execute(message, args);
  } else if (command === 'succme') {
    client.commands.get('succme').execute(message, args);
  }
});

fs.readFile('./discord_config.json', (err, jsonString) => {
  if(err) {
    console.log('parsing json failed with error: ', err);
  }
  discord_config = JSON.parse(jsonString);
  client.login(discord_config.bot_token);
});