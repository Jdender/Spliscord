import { Command } from '../../interfaces/command';
import { promisified as phin } from 'phin';

const cat: Command = {
    name: 'api.cat',
    aliases: ['api.meow'],
    cooldown: 5,
    description: 'Get a random cat image from `random.cat`.',
    async execute(client, message) {

        const response = await phin({
            url: 'https://random.cat/meow',
            parse: 'json',
        });

        message.channel.send(response.body.file);

    },
}

export default cat;