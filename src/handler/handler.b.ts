export { UserConfig, GuildConfig } from '../client/config.i';
export { CommandMessage, Command } from '../cmdUtil/commands.i';
export { Collection } from 'discord.js';
export { Spliscord as Client } from '../client/main';
export { TypeKeys as StorageTypeKeys } from '../storage/actions';
export { permCheck } from '../perms/permCheck';

import parseArgs = require('minimist');
export { parseArgs };