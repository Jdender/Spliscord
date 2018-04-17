import { Client } from 'discord.js';

// Requested by MBN(339586884772823043)<Guild>

export default (client: Client) =>
    client.on('guildMemberAdd', member => {

        if (member.guild.id !== '339586884772823043') return;

        const role = member.guild.roles.get('425092490916397067')!;

        member.addRole(role);
    });
