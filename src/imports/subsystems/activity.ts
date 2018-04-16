import { Client } from 'discord.js';

export default (client: Client) =>
    client.on('guildMemberAdd', () =>
        // tslint:disable-next-line:max-line-length
        client.user.setActivity(`@Spliscord help | ${client.guilds.size} Guilds, ${client.channels.size} Channels, ${client.users.size} Users.`),
    );
