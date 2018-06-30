import { applyOptions } from '../../util/applyOptions';
import { Command, KlasaMessage } from 'klasa';

const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = ['♠️', '♦', '♥️', '♠️'];

@applyOptions({
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
            .map(() => `**${this.random(ranks)}**${this.random(suits)}`)
            .join(', ')
        );
    }

    // Return a random element from a array
    random<T>(arr: T[]): T {
        
        return arr[Math.floor(Math.random() * arr.length)];
    }
}
