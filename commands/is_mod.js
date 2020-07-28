module.exports = {
  name: 'succ',
  description: 'has permission?',
  execute(message, args) {
    if (message.member.roles.cache.has('737473271464984590')) {
      message.channel.send('Authorized');
    } else {
      message.channel.send('Unauthorized');
    }
  }
}