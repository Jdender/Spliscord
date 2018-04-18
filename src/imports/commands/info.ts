import { Client } from 'discord.js';

export default (client: Client) => {

    client.registry.addCommand({
        name: 'info',
        description: 'Get various links for the bot.',
        aliases: ['invite', 'link', 'links'],
        usage: '',
        cooldown: 3,
        permissions: 0,
        args: null,
    });

    client.registry.on('info', ({message}) =>
    message.channel.send(
`**Spliscord** - Made by jdender~/House Master (Dual mains)

Invite Link: <${client.inviteLink}>
GitHub: <${require('../../../package.json').homepage}>
        `));

};
