module.exports = {
    name: 'kick',
    description: 'Kick a user',
    guildOnly: true,
    execute(message, args) {
        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        const taggedUser = message.mentions.users.first();
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to kick them!');
        }

        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    }
}