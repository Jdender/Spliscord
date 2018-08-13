import { applyOptions } from '../../../util/applyOptions';
import { Command, CommandOptions, KlasaMessage, KlasaUser } from 'klasa';

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

        const prebal: number = target.configs.get('balance');

        await target.configs.update('balance', prebal + amount);

        return message.send(
            `Added ${amount} to ${target.username}'s ${prebal}. They now have a balance of ${target.configs.get('balance')}.`
        );
    };

    take = async (message: KlasaMessage, [target, amount]: [KlasaUser, number]) => {

        const prebal: number = target.configs.get('balance');

        await target.configs.update('balance', prebal - amount);

        return message.send(
            `Took ${amount} from ${target.username}'s ${prebal}. They now have a balance of ${target.configs.get('balance')}.`
        );
    };

    set = async (message: KlasaMessage, [target, amount]: [KlasaUser, number]) => {

        const prebal: number = target.configs.get('balance');

        await target.configs.update('balance', amount);

        return message.send(
            `Set ${target.username}'s balance to ${target.configs.get('balance')} from ${prebal}.`
        );
    };
        
}
