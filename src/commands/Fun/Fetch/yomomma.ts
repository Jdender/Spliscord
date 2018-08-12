import { applyOptions } from '../../../util/applyOptions';
import { Command, CommandOptions, KlasaMessage } from 'klasa';
import { FunMisc } from '../../../services/FunMisc';

@applyOptions<CommandOptions>({
    name: 'yomomma',
    description: 'Sends a yomomma joke from yomomma.info.',
})
export default class extends Command {

    async run(message: KlasaMessage) {

        const joke = await FunMisc.fetchJson('http://api.yomomma.info', body => body.joke as string);

        return message.send(joke || 'Unable to find a yomomma joke.');
    }
}
