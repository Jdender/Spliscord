if (!process.env.TOKEN) process.exit(1);

process
.on('unhandledRejection', e => console.error(`UNHANDLED REJECTION: ${e.stack || e}`)) 
.on('uncaughtException', e => console.error(`UNCAUGHT EXCEPTION: ${e.stack || e}`));

import './util/patchStore';
import { KlasaClient } from 'klasa';
import { config } from './config';

// Change klasa client options here
const client = new KlasaClient(config)

// Use webhook error reporter if in prod
import reporter from './util/errorReporter';
if (process.env.NODE_ENV === 'production') reporter(client);

// Init services
import { Currency } from './services/Currency';
Currency.initDatabase(client.gateways.users.schema);

// Start bot
client.login(process.env.TOKEN!);
