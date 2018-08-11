import { applyOptions } from '../../../util/applyOptions';
import { Command, CommandOptions,  KlasaMessage } from 'klasa';
import { MessageAttachment } from 'discord.js';

import fetch from 'node-fetch';
import cheerio = require('cheerio');

/*
I am aware that this is bad practas.
But until I figure out why the
normal json api returns 403,
I'm going to have to use this.
*/

@applyOptions<CommandOptions>({
    name: 'cat',
    description: 'Grabs a random cat image from random.cat.',
    aliases: ['randomcat', 'meow'],
})
export default class extends Command {

    async run(message: KlasaMessage) {

        // Fetch random.cat and load the page with cherrio
        const $ = await fetch('http://random.cat')
            .then(response => response.text())
            .then(cheerio.load)
            // Blank page if error
            .catch(() => cheerio.load(''));

        const cat = $('#cat').prop('src') as string | undefined;

        return message.send(cat
            // Make attachment with same file ext
            ? new MessageAttachment(cat, `cat${cat.slice(cat.lastIndexOf('.'), cat.length)}`)
            : 'Unable to fetch cat image.'
        );
    }

}