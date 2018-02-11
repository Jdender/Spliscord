import { Command, CommandMessage, Client } from '../cmdHandler/commands.b';

const avatar: Command = {
    name: 'avatar',
    aliases: ['icon', 'pfp'],
    cooldown: 5,
    description: 'Get one or multiple user\'s avatar.',
    args: false,
    userConf: false,
    guildConf: false,
    guildOnly: false,
    execute(client: Client, message: CommandMessage) {

        const mentions = (client.prefixMention.exec(message.content) && (message.prefix === message.content.match(client.prefixMention)[0])) ?
            message.mentions.users.filter(user => {
                return user.id !== client.user.id;
            }) :
            message.mentions.users;

        if (!mentions.size) {
            message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
            return
        }

        const avatarList = mentions.map(user => {
            return `${user.username}'s avatar: ${user.displayAvatarURL}`;
        });

        message.channel.send(avatarList);
    },
}

export default avatar;