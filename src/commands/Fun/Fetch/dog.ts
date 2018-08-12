import { applyOptions } from '../../../util/applyOptions';
import { Command, CommandOptions, KlasaMessage } from 'klasa';
import { MessageAttachment } from 'discord.js';
import { FunMisc } from '../../../services/FunMisc';

@applyOptions<CommandOptions>({
    name: 'dog',
    description: 'Grabs a random dog image from dog.ceo.',
    aliases: ['randomdog', 'woof'],
})
export default class extends Command {

    async run(message: KlasaMessage) {

        const dog = await FunMisc.fetchJson('https://dog.ceo/api/breeds/image/random', body => body.message as string);

        return message.send(dog
            ? FunMisc.makeAttachment('dog', dog)
            : 'Unable to fetch dog image.'
        );
    }

}