import { applyOptions } from '../../../util/applyOptions';
import { Command, KlasaMessage } from 'klasa';
import { MessageAttachment } from 'discord.js';

import fetch from 'node-fetch';

@applyOptions({
    name: 'dog',
    description: 'Grabs a random dog image from dog.ceo.',
    aliases: ['randomdog', 'woof'],
})
export default class extends Command {

    async run(message: KlasaMessage) {

        // Fetch dog.ceo and load the page as json
        const dog = await fetch('https://dog.ceo/api/breeds/image/random')
            .then(response => response.json())
            .then(body => body.message as string)
            // Return null if http error
            .catch(() => null);

        if (!dog) return message.send('Unable to fetch dog image.');

        // Make attachment with same file ext
        const file = new MessageAttachment(dog, `dog${dog.slice(dog.lastIndexOf('.'), dog.length)}`);

        return message.send(file);
    }

}