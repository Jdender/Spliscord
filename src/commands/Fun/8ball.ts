import applyOptions from '../../util/applyOptions';
import { Command, KlasaMessage } from 'klasa';
import ball8 = require( '../../../resources/8ball.json');

@applyOptions({
    name: '8ball',
    description: 'Asks the magic 8ball a question.',
    usage: '<Question:string>',
})
export default class Ball8 extends Command{

    async run(message: KlasaMessage) {
        // Send a random response
        return message.send(this.response);
    }

    get response() {
        return ball8[Math.floor(Math.random() * ball8.length)];
    }

}
