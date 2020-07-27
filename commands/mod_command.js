module.exports = {
  name: 'succ?',
  description: 'has permission?',
  execute(message, args) {
    if (message.member.roles.cache.has('737394742312304650')) {
      message.channel.send('Authorized');
    } else {
      message.channel.send('Unauthorized');
    }
  }
}