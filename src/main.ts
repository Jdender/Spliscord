import { Client } from 'discord.js';
import { readdirSync, statSync  } from 'fs';
import klaw = require('klaw');
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Logger } from './classes/logger';
import { Registry } from './classes/registry';
import { GuildConfig, UserConfig } from './classes/settings';
import './utill';

const client = new Client();
client.logger = new Logger();
client.registry = new Registry();

// Register loggers
client.on('debug', d => client.logger.debug(d));
client.on('warn', w => client.logger.warn(w));
client.on('error', e => client.logger.error(e));

// Wait for the client to be ready
new Promise(resolve => client.once('ready', resolve))

// tslint:disable-next-line:max-line-length
.then(() => client.logger.ready(`Runing in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`))

// Set some consts
.then(() => {
    client.prefixMention = new RegExp(`^<@!?${client.user.id}> `);
    client.inviteLink = `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot`;
})

.then(() => Promise.all([ // Run in parralel

    // Make connection to db
    createConnection({
        name: 'spliscord',
        database: './.data/store.sqlite',
        type: 'sqlite',
        entities: [
            UserConfig, GuildConfig,
        ],
        synchronize: true,
    })
    .then(db => {
        client.userConf = db.getRepository(UserConfig);
        client.guildConf = db.getRepository(GuildConfig);
    }),

    // Walk and import files
    new Promise<string[]>((resolve, reject) => {

        const items: string[] = []; // Need to say string[] so ts doesn't make it never[]

        klaw('src/imports/') // Stream event emiter thing?
        .on('data', item => !item.stats.isDirectory() && items.push(item.path)) // If not dir add to item array
        .on('end', () => resolve(items)) // When done return item array
        .on('error', reject); // Just pass the raw reject function

    })
    .then(files => files.map(file => import(file))) // Map paths to their import promises
    .then(files => Promise.all(files)), // Await all imports

]))

// Run their default exports with the client as an arg after imported and db is ready
.then(([, files]) => files.forEach(file => file.default(client)))
.catch(client.logger.error);

client.login(process.env.TOKEN);
