module.exports = {
  name: 'unsucc',
  description: 'unsuccs!',
  execute(message, args) {
    if (message.member.roles.cache.has('737473271464984590')) {
      message.channel.send('Succ begone');
      message.member.roles.remove('737473271464984590').catch(console.error)
    } else {
      message.channel.send('One who has not can not be not');
    }
  }
}