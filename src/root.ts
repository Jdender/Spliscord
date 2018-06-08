if (!process.env.TOKEN) process.exit(1);

import { client } from './structures/Client';

client.login(process.env.TOKEN!);

process
.on('unhandledRejection', e => console.error(`UNHANDLED REJECTION: ${e.stack || e}`)) 
.on('uncaughtException', e => console.error(`UNCAUGHT EXCEPTION: ${e.stack || e}`));
