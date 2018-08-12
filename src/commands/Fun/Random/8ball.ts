import { applyOptions } from '../../../util/applyOptions';
import { Command, CommandOptions, KlasaMessage } from 'klasa';
import ball8 = require( '../../../../resources/8ball.json');
import { FunMisc } from '../../../services/FunMisc';

@applyOptions<CommandOptions>({
    name: '8ball',
    description: 'Asks the magic 8ball a question.',
    aliases: ['ask8ball', 'ask', 'question'],
})
export default class extends Command{

    async run(message: KlasaMessage) {
        // Send a random response
        return message.send(FunMisc.randomEle(ball8));
    }
}
