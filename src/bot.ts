const version: string[] = process.version.slice(1).split('.');
if ((version[0] as any) < 8 || ((version[1] as any) < 9)) throw new Error('Node 8.9.0 or higher is required. Update Node.');

process.on('unhandledRejection', (e) => console.error(`Uncaught Promise Rejection:\n${e}`));

import Spliscord from './main';
import config from './config';
const client = new Spliscord(config);