export { Collection } from 'discord.js';
export { BotConfig } from './config.i';
export { walk } from '../util/walk';
export { readdirAsync } from '../util/fsAsync';
export { Command } from '../cmdHandler/commands.i';
export { flattenDeep } from 'lodash';
export { Logger } from '../logger/main';
export { execute as executeCmd } from '../cmdHandler/main';

import low = require('lowdb');
import LowDbFileSync = require('lowdb/adapters/FileSync');
export {low, LowDbFileSync};