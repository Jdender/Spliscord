import { Command } from '../../interfaces/command';
import { promisified as phin } from 'phin';

const ping: Command = {
    name: 'api.dog',
    aliases: ['api.woof','api.bark','api.doggo'],
    cooldown: 5,
    description: 'Get a random dog image from `random.dog`.',
    async execute(client, message) {

        const response = await phin({
            url: 'https://random.dog/woof.json',
            parse: 'json',
        });

        message.channel.send(response.body.url);

    },
}

export default ping;