if (!process.env.TOKEN) process.exit(1);

process
.on('unhandledRejection', e => console.error(`UNHANDLED REJECTION: ${e.stack || e}`)) 
.on('uncaughtException', e => console.error(`UNCAUGHT EXCEPTION: ${e.stack || e}`));

import { client } from './structures/Client';

client.login(process.env.TOKEN!);
