import { applyOptions } from '../../util/applyOptions';
import { Command, KlasaMessage } from 'klasa';

const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = ['♠️', '♦', '♥️', '♠️'];

@applyOptions({
    name: 'card',
    description: 'Draws random cards from a deck.',
    usage: '<Amount:int{1,10}>',
})
export default class extends Command {

    async run(message: KlasaMessage, [amount]: [number]) {

        const lines = [];

        // Make rank-suit pairs for Amount arg
        for (let i = 0; i < amount; ++i)
            lines.push(`**${this.random(ranks)}**${this.random(suits)}`);

        return message.send(lines.join(', '));
    }

    // Return a random element from a array
    random<T>(arr: T[]): T {
        
        return arr[Math.floor(Math.random() * arr.length)];
    }
}
