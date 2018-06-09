import { Client } from '../structures/Client';
import { Command, KlasaMessage } from 'klasa';
const ball8: string[] = require('../../resources/8ball.json');


const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = ['♠️', '♦', '♥️', '♠️'];

const random = <T>(arr: T[]): T => 
    arr[Math.floor(Math.random() * arr.length)];


export default (client: Client) => {

    @client.RegisterPiece({
        type: 'commands',
        name: 'card',
        description: 'Draws random cards from a deck.',
        usage: '<Amount:int{1,10}>',
    })
    class Card extends Command {

        async run(message: KlasaMessage, [amount]: [number]) {

            const lines = [];
    
            for (let i = 0; i < amount; ++i)
                lines.push(`**${random(ranks)}**${random(suits)}`);
    
            return message.send(lines.join(', '));
        }
    }

    @client.RegisterPiece({
        type: 'commands',
        name: '8ball',
        description: 'Asks the magic 8ball a question.',
        usage: '<Question:string>',
    })
    class Ball8 extends Command {

        async run(message: KlasaMessage) {
            return message.send(random(ball8));
        }

    }

};
