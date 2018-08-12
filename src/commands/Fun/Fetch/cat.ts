import { applyOptions } from '../../../util/applyOptions';
import { Command, CommandOptions,  KlasaMessage } from 'klasa';
import { MessageAttachment } from 'discord.js';
import { FunMisc } from '../../../services/FunMisc';

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

        const $ = await FunMisc.fetchCheerio('http://random.cat');

        const cat = $('#cat').prop('src') as string | undefined;

        return message.send(cat
            ? FunMisc.makeAttachment('cat', cat)
            : 'Unable to fetch cat image.'
        );
    }

}