import { applyOptions } from '../../../util/applyOptions';
import { Command, CommandOptions, KlasaMessage, KlasaUser } from 'klasa';
import { Currency } from '../../../services/Currency';

@applyOptions<CommandOptions>({
    name: 'balance',
    aliases: ['bal'],
    description: 'Check your own or someone else\'s SPC balance.',
    usage: '[TargetUser:user]',
})
export default class extends Command {

    async run(message: KlasaMessage, [target]: [KlasaUser]) {

        const balance = Currency.getBalance(target || message.author);

        return message.send(
            `${target ? `${target.username} has` : 'You have'} a balance of ${balance} spliscoin${balance !== 1 ? 's' : ''}.`
        );
    }

}
