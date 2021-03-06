import { applyOptions } from '../../../util/applyOptions';
import { Command, CommandOptions, KlasaMessage } from 'klasa';
import { FunMisc } from '../../../services/FunMisc';

const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = ['♠️', '♦', '♥️', '♣'];

@applyOptions<CommandOptions>({
    name: 'card',
    description: 'Draws random cards from a deck.',
    usage: '<Amount:int{1,10}>',
    aliases: ['cards', 'randomcard', 'randomcards'],
})
export default class extends Command {

    async run(message: KlasaMessage, [length]: [number]) {

        // Make rank-suit pairs for Amount arg
        return message.send(
            Array
            .from({ length })
            .map(() => `**${FunMisc.randomEle(ranks)}**${FunMisc.randomEle(suits)}`)
            .join(', ')
        );
    }
}
