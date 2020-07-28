module.exports = {
  name: 'remove_bot_role',
  description: 'Removes the bot testing role from the member',
  execute(message, args) {
    if (!message.member) {
      message.channel.send("Direct messaging (or whatever you're doing) is not supported yet" );
    } else if (message.member.roles.cache.has('737473271464984590')) {
      message.channel.send('Succ begone');
      message.member.roles.remove('737473271464984590').catch(console.error)
    } else {
      message.channel.send('One who has not can not be not');
    }
  }
}