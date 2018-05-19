import { Client } from 'discord.js';

export default (client: Client) =>
    client.on('guildMemberAdd', () =>
        client.user.setActivity(`@Spliscord help | ${client.guilds.size} Guilds, ${client.channels.size} Channels, ${client.users.size} Users.`),
    );
