import { applyOptions } from '../../../util/applyOptions';
import { Command, CommandOptions, KlasaMessage, KlasaUser } from 'klasa';

@applyOptions<CommandOptions>({
    name: 'balance',
    aliases: ['bal'],
    description: 'Check your own or someone else\'s SPC balance.',
    usage: '[TargetUser:user]',
})
export default class extends Command {

    async run(message: KlasaMessage, [target]: [KlasaUser]) {

        const balance: number = (target || message.author).configs.get('balance');

        return message.send(
            `${target ? `${target.username} has` : 'You have'} a balance of ${balance} spliscoin${balance !== 1 ? 's' : ''}.`
        );
    }

}
