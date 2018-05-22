import { Client } from 'discord.js';
import { GuildConfig } from '../core/settings';

export default (client: Client) => {

    // Join role
    client.on('guildMemberAdd', async member => {

        const guildConf: GuildConfig =
        await client.guildConf.findOneById(member.guild.id)
        || await client.guildConf.save({ id: member.guild.id });

        if (!guildConf.joinRole) return;

        const role = member.guild.roles.get(guildConf.joinRole);

        if (!role) return;

        member.addRole(role);
    });

    // Activity updater
    client.on('guildMemberAdd', () =>
        client.user.setActivity(`@Spliscord help | ${client.guilds.size} Guilds, ${client.channels.size} Channels, ${client.users.size} Users.`),
    );
}