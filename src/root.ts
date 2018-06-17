if (!process.env.TOKEN) process.exit(1);

process
.on('unhandledRejection', e => console.error(`UNHANDLED REJECTION: ${e.stack || e}`)) 
.on('uncaughtException', e => console.error(`UNCAUGHT EXCEPTION: ${e.stack || e}`));

import './util/patchStore';
import { KlasaClient } from 'klasa';
import { config } from './config';

// Change klasa client options here
new KlasaClient(config)
.login(process.env.TOKEN!);
