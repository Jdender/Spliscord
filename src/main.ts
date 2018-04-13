import Chalk from 'chalk';
import { Client } from 'discord.js';
import { readdirSync, statSync  } from 'fs';
import klaw = require('klaw');
import { createConnection } from 'typeorm';
import { GuildConfig, UserConfig } from './settings';

const client = new Client();

// Wait for the client to be ready
new Promise(resolve => client.once('ready', resolve))
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
.then(([, files]) => files.forEach(file => file.default(client))),

client.login(process.env.TOKEN);
