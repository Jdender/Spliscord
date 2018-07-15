import { applyOptions } from '../../../util/applyOptions';
import { Command, KlasaMessage } from 'klasa';
import { MessageAttachment } from 'discord.js';

import fetch from 'node-fetch';

@applyOptions({
    name: 'yesno',
    description: 'Get a yes or no and a image to go with it.',
    usage: '<Question:string>',
})
export default class extends Command {

    async run(message: KlasaMessage) {

        // Fetch yesno.wtf and load page as json
        const { image, answer } = await fetch('https://yesno.wtf/api')
            .then(response => response.json())
            // Null if error
            .catch(() => null);

        if (!image || !answer) return message.send('Unable to fetch yesno image.');

        // Make attachment with same file ext
        const file = new MessageAttachment(image, `yesno${image.slice(image.lastIndexOf('.'), image.length)}`);

        // Caplise the first leter
        await message.send(answer === 'yes' ? 'Yes' : 'No');
        return message.send(file);
    }

}