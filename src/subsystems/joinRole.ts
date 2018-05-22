import { Client } from 'discord.js';
import { GuildConfig } from '../../classes/settings';

export default (client: Client) =>
    client.on('guildMemberAdd', async member => {

        const guildConf: GuildConfig =
        await client.guildConf.findOneById(member.guild.id)
        || await client.guildConf.save({ id: member.guild.id });

        if (!guildConf.joinRole) return;

        const role = member.guild.roles.get(guildConf.joinRole);

        if (!role) return;

        member.addRole(role);
    });
