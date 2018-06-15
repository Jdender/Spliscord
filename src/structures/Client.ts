import { KlasaClient } from 'klasa';

// Change klasa client options here
export const client = new KlasaClient({
    prefix: '`',
    readyMessage: (client: KlasaClient) => `${client.user.tag}, Runing in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`,
});
