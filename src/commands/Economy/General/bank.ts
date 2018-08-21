import { applyOptions } from '../../../util/applyOptions';
import { Command, CommandOptions, KlasaMessage, KlasaUser } from 'klasa';
import { Currency } from '../../../services/Currency';

@applyOptions<CommandOptions>({
    name: 'bank',
    description: 'Give, take, or set someone\'s balance.',
    usage: '<give|take|set> <TargetUser:user> <Amount:int>',
    usageDelim: ' ',
    subcommands: true,
    permissionLevel: 8,
})
export default class extends Command {

    give = async (message: KlasaMessage, [target, amount]: [KlasaUser, number]) => {

        const { prebal, newbal } = await Currency.addBalance(target, amount);

        return message.send(
            `Added ${amount} to ${target.username}'s ${prebal}. They now have a balance of ${newbal}.`
        );
    };

    take = async (message: KlasaMessage, [target, amount]: [KlasaUser, number]) => {

        const { prebal, newbal } = await Currency.takeBalance(target, amount);

        return message.send(
            `Took ${amount} from ${target.username}'s ${prebal}. They now have a balance of ${newbal}.`
        );
    };

    set = async (message: KlasaMessage, [target, amount]: [KlasaUser, number]) => {

        const { prebal, newbal } = await Currency.setBalance(target, amount);

        return message.send(
            `Set ${target.username}'s balance to ${newbal} from ${prebal}.`
        );
    };
        
}
