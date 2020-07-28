module.exports = {
  name: 'has_bot_role',
  description: 'Checks if member has role for bot testing channel',
  execute(message, args) {
    if (!message.member) {
      message.channel.send("Direct messaging (or whatever you're doing) is not supported yet" );
    } else if (message.member.roles.cache.has('737473271464984590')) {
      message.channel.send('You have access to bot testing (secret-succ-channel)');
    } else {
      message.channel.send('You do not have access to bot testing. Use the command -succme to get access');
    }
  }
}