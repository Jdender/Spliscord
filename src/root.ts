if (!process.env.TOKEN) process.exit(1);

process
.on('unhandledRejection', e => console.error(`UNHANDLED REJECTION: ${e.stack || e}`)) 
.on('uncaughtException', e => console.error(`UNCAUGHT EXCEPTION: ${e.stack || e}`));

import './util/patchStore';
import { KlasaClient } from 'klasa';

// Change klasa client options here
new KlasaClient({
    prefix: '`',
    readyMessage: (client: KlasaClient) => `${client.user.tag}, Runing in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`,
})
.login(process.env.TOKEN!);
