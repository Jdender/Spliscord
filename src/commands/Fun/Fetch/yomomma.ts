import { applyOptions } from '../../../util/applyOptions';
import { Command, KlasaMessage } from 'klasa';

import fetch from 'node-fetch';

// Same as ./dog.ts but for yomomma
// So look there for comments

@applyOptions({
    name: 'yomomma',
    description: 'Sends a yomomma joke from yomomma.info.',
})
export default class extends Command {

    async run(message: KlasaMessage) {

        const joke = await fetch('http://api.yomomma.info')
            .then(response => response.json())
            .then(body => body.joke as string)
            .catch(() => null);

        if (!joke) return message.send('Unable to fetch dog image.');

        return message.send(joke);
    }

}