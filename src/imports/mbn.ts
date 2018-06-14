// Requested by MBN(339586884772823043)<Guild>

import { Client } from '../structures/Client';
import { Monitor, KlasaMessage } from 'klasa';

export default (client: Client) => {

    @client.RegisterPiece({
        type: 'monitors',
        name: 'mbn_verify',
    })
    class Verify extends Monitor {

        async run(message: KlasaMessage) {

            if (message.channel.id !== '427303825171415050') return;
            if (!message.content.match(/i confirm that i am over 18 years old/i)) return;
    
            if (!message.member.roles.has('425092490916397067') && message.member.roles.has('415221406452809728'))
                return message.channel.send('You\'re already verified!');

            await message.member.roles.set(['415221406452809728'], 'Verify');

            message.reply('Welcome, you\'re verified!');
        }
    }
};
