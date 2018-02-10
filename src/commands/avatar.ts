import { Command } from '../cmdHandler/commands.i';

const avatar: Command = {
    name: 'avatar',
    aliases: ['icon', 'pfp'],
    cooldown: 5,
    description: 'Get one or multiple user\'s avatar.',
    execute(client, message) {

        const mentions = (client.prefixMention.exec(message.content) && (message.prefix === message.content.match(client.prefixMention)[0])) ?
            message.mentions.users.filter(user => {
                return user.id !== client.user.id;
            }) :
            message.mentions.users;

        if (!mentions.size) {
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
        }

        const avatarList = mentions.map(user => {
            return `${user.username}'s avatar: ${user.displayAvatarURL}`;
        });

        message.channel.send(avatarList);
    },
}

export default avatar;