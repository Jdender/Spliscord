module.exports = {
    name: 'avatar',
    aliases: ['icon', 'pfp'],
    cooldown: 5,
    description: 'Get one or multiple user\'s avatar.',
    execute(client, message) {

        const mentions = message.mentions.users.filter(user => {
            return user.id !== client.user.id;
        });

        if (!mentions.size) {
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
        }

        const avatarList = mentions.map(user => {
            return `${user.username}'s avatar: ${user.displayAvatarURL}`;
        });

        message.channel.send(avatarList);
    },
};