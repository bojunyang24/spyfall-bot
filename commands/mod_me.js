module.exports = {
  name: 'succme',
  description: 'permissions test',
  execute(message, args) {
    if (message.member.roles.cache.has('737394742312304650')) {
      message.channel.send('You are already authorized');
    } else {
      message.channel.send('You have been knighted a succ');
      message.member.roles.add('737394742312304650').catch(console.error);
    }
  }
}