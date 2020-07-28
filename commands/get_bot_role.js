module.exports = {
  name: 'get_bot_role',
  description: 'Gives member the role for bot testing',
  execute(message, args) {
    if (!message.member) {
      message.channel.send("Direct messaging (or whatever you're doing) is not supported yet" );
    } else if (message.member.roles.cache.has('737473271464984590')) {
      message.channel.send('You have already received the succ');
    } else {
      message.channel.send('You have been knighted a succ');
      message.member.roles.add('737473271464984590').catch(console.error);
    }
  }
}