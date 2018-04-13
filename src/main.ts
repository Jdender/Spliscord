import Chalk from 'chalk';
import { Client } from 'discord.js';
import { readdirSync, statSync  } from 'fs';
import klaw = require('klaw');

const client = new Client();

client.on('ready', () => {

    console.log('ready');

    // We could use callbacks, but promises are nicer
    new Promise<string[]>((resolve, reject) => {

        const items: string[] = []; // Need to say string[] so ts doesn't make it never[]

        klaw('src/imports/') // Stream event emiter thing?
        .on('data', item => !item.stats.isDirectory() && items.push(item.path)) // If not dir add to item array
        .on('end', () => resolve(items)) // When done return item array
        .on('error', reject); // Just pass the raw reject function

    })
    .then(files => files.map(file => import(file))) // Map paths to their import promises
    .then(files => Promise.all(files)) // Await all imports
    .then(files => files.forEach(file => file.default(client))) // Run their default exports with the client as an arg
    .catch(console.error); // Allways catch promises

});

client.login(process.env.TOKEN);
