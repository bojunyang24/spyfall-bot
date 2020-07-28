module.exports = {
  name: 'succme',
  description: 'permissions test',
  execute(message, args) {
    if (message.member.roles.cache.has('737473271464984590')) {
      message.channel.send('You are already authorized');
    } else {
      message.channel.send('You have been knighted a succ');
      message.member.roles.add('737473271464984590').catch(console.error);
    }
  }
}