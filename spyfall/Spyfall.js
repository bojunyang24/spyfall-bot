const Discord = require('discord.js');
const Player = require('./Player');
const PrivateVote = require('./PrivateVote');

class Spyfall {

  constructor() {
    this.players = new Set();
  }

  init(message) {
    // used to check if game has initiated
    this.initiated = true;
    this.channel = message.channel;
    this.client = message.client;
    
    const Embed = new Discord.MessageEmbed()
      .setTitle("Starting new Spyfall game")
      .setDescription("To join, react with :detective:")
      .addField('To start the game use this command:', '-spyfall start');

      this.channel.send(Embed).then(initMessage => {
        this.initMessage = initMessage;
        this.initMessage.react("🕵️");

        const spy_emoji_filter = (reaction, user) => {
          return reaction.emoji.name === '🕵️' && user.id !== this.initMessage.author.id;
        }
        this.spy_emoji_collector = this.initMessage.createReactionCollector(spy_emoji_filter);

        // collects users that react with 🕵️ to the message
        console.log('Collecting reactions and adding users to game');
        this.spy_emoji_collector.on('collect', (reaction, user) => {
          this.players.add(new Player(user.tag, user.id));
          console.log(`Collected emoji ${reaction.emoji.name}  from ${user.tag} and added player to game`);
        });
      });
  }

  start(message) {
    if (!this.initiated) {
      message.channel.send("A game of Spyfall has not been initated. Please use command -spyfall init to begin playing");
      return;
    } else if (this.players.size < 3) {
      this.channel.send("There needs to be at least 3 players in the game. Please react to the init message above to join the game");
      return;
    }
    this.started = true;
    this.spy_emoji_collector.stop();
    console.log('Reaction collector stopped');
    console.log('Players: ');
    this.players.forEach(p => console.log(p.userId));

    let start_message = 'Beginning a Spyfall game with these players: ';
    start_message += [...this.players]
      .map(player => player.userTag.split('#').shift())
      .join(', ');
    
    this.channel.send(start_message + "!");
  }

  async vote(suspect) {
    if (!this.initiated || !this.started) {
      this.channel.send("Please make sure to start the game with init, then start");
    } else if (!suspect || !suspect.startsWith('<@')) {
      this.channel.send("Please specfiy who you want to accuse by @-ing them");
      return;
    }
    
    this.privateVotes = [];
    const suspectUser = this.getUserFromMention(suspect);

    this.players.forEach(player => {
      if (player.userId != suspectUser) {
        const discordUser = this.getUserFromId(player.userId);
        this.privateVotes.push(new PrivateVote(this.channel, discordUser));
      }
    });

    const requestedVotes = this.privateVotes.map(privateVote => privateVote.requestVote(suspectUser.username).then(vote => vote));

    await Promise.all(requestedVotes);

    if(this.privateVotes.every(response => response.vote == true)) {
      this.channel.send("The vote was unanimous");
    } else {
      this.channel.send("The vote was not unanimous");
    }
  }

  end() {
    this.initiated = false;
    this.started = false;
    this.players = null;
    this.channel.send("Game has been reset. Please init again to play another one")
  }

  getUserFromId(userId) {
    return this.client.users.cache.get(userId);
  }

  getUserFromMention(mention) {
    if (!mention) return "bad";
    if (mention.startsWith('<@') && mention.endsWith('>')) {
      mention = mention.slice(2, -1);
      console.log('1');
  
      if (mention.startsWith('!')) {
        console.log('2');
        mention = mention.slice(1);
      }
      console.log(mention);
      return this.client.users.cache.get(mention);
    }
  }
}

module.exports = Spyfall;