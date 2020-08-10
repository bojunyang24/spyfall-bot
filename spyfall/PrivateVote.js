const Discord = require('discord.js');

class PrivateVote {

  constructor(channel, user) {
    this.channel = channel;
    this.user = user;
  }

  requestVote(suspect) {
    const Embed = new Discord.MessageEmbed()
      .setTitle(`Do you think ${suspect} is the SPY?`)
      .setDescription(`React with :thumbsup: if you think ${suspect} is a SPY. \nReact with :thumbsdown: if you don't think ${suspect} is a SPY`);

    return this.user.send(Embed).then(voteRequest => {
      voteRequest.react("👍");
      voteRequest.react("👎");

      const vote_filter = (reaction, user) => {
        return user.id === this.user.id && (reaction.emoji.name === '👍' || reaction.emoji.name === '👎');
      }

      this.vote_collector = voteRequest.createReactionCollector(vote_filter, {max: 1});

      return new Promise((resolve) => {
        this.vote_collector.on('collect', (reaction, user) => {
          this.vote = reaction.emoji.name === '👍';
          this.channel.send(`1 vote for ${this.vote}`);
          resolve(this.vote);
        })
      });

      // this.vote_collector.on('collect', (reaction, user) => {
      //   console.log(user.tag + " voted: " + reaction.emoji.name);
      //   if (reaction.emoji.name === '👍') {
      //     this.vote = true;
      //     this.channel.send("1 vote for yes");
      //     this.vote;
      //   } else {
      //     this.vote = false;
      //     this.channel.send("1 vote for no");
      //     this.vote;
      //   }
      // });

    });
  }
}

module.exports = PrivateVote;