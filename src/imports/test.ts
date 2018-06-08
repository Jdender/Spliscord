import { Client } from '../structures/Client';
import { Command, KlasaMessage } from 'klasa';

export default (client: Client) => {


    @client.RegisterPiece({
        type: 'commands',
        name: 'test',
    })
    class Test extends Command {

        async run(message: KlasaMessage) {
            return message.send('Test');
        }

    }

};