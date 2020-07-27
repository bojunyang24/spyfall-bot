module.exports = {
  name: 'yeet',
  description: 'this is a yeet command!',
  execute(message, args) {
    if(args.length > 0) {
      message.channel.send(`yote: ${args}`);
    } else {
      message.channel.send('nothing to yote');
    }
  }
}