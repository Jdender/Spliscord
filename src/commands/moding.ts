import { Client, Message, GuildMember } from 'discord.js';

export const resolveMember = (id: string, message: Message): GuildMember | false =>
    message.guild.members.get(id) || message.mentions.members.first() || false;

export default (client: Client) => {

    client.registry.addCommand({
        name: 'kick',
        description: 'Kick a member using a mention or id.',
        aliases: [],
        usage: '<@User#1234 | 123345334690>',
        cooldown: 3,
        permissions: 1,
        args: null,
    });

    client.registry.on('kick', async ({message, args}) => {

        const member = resolveMember(args._[0], message);

        if (!member) 
            return message.channel.send('Unable to resolve mention or user id.');

        if (!member.kickable)
            return message.channel.send('I cannot kick this user. Do they have a higher role? Do I have kick permissions?');

        const reason = `${message.author.tag} : ${args._[1] || 'No reason provided'}`;
        
        await member.kick(reason)
        .catch(error => message.channel.send(`I couldn't kick because of : ${error}`));

        message.channel.send(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
    });


    client.registry.addCommand({
        name: 'ban',
        description: 'Ban a member using a mention or id.',
        aliases: [],
        usage: '<@User#1234 | 123345334690>',
        cooldown: 3,
        permissions: 2,
        args: null,
    });

    client.registry.on('ban', async ({message, args}) => {

        const member = resolveMember(args._[0], message);

        if (!member) 
            return message.channel.send('Unable to resolve mention or user id.');

        if (!member.bannable)
            return message.channel.send('I cannot ban this user. Do they have a higher role? Do I have ban permissions?');

        const reason = `${message.author.tag} : ${args._[1] || 'No reason provided'}`;
        
        await member.ban(reason)
        .catch(error => message.channel.send(`I couldn't ban because of : ${error}`));

        message.channel.send(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
    });
};
