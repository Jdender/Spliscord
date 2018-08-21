import { applyOptions } from '../../../util/applyOptions';
import { Command, CommandOptions, KlasaMessage } from 'klasa';
import { Currency } from '../../../services/Currency';

const cooldown = 20 * 60 * 60 * 1000; // 20 hours in miliseconds

@applyOptions<CommandOptions>({
    name: 'daily',
    description: 'Collect your daily bonus or check how long utill you can.',
})
export default class extends Command {

    async run(message: KlasaMessage) {

        const now = Date.now();

        const timespan = now - message.author.settings.get('lastDailyCollect') as number;

        return timespan < cooldown
        ? this.notTimeYet(message, timespan)
        : this.addDailyBonus(message, now);
    }

    async notTimeYet(message: KlasaMessage, timespan: number) {

        const waitTime = this.formatWaitTime(new Date(timespan));

        return message.send(`You have to wait ${waitTime} before collecting again.`);
    }

    formatWaitTime = (stamp: Date) =>
        `${stamp.getHours()} Hours, ${stamp.getMinutes()} Minutes, and ${stamp.getSeconds()} Seconds`;


    async addDailyBonus(message: KlasaMessage, now: number) {

        await message.author.settings.update('lastDailyCollect', now);

        const { newbal } = await Currency.addBalance(message.author, 50);

        return message.send(`Collected your daily bonus. You now have a balance of ${newbal}.`);
    }

    async init() {

        const { schema } = this.client.gateways.users;

        if (!schema) return;

        if (!schema.has('lastDailyCollect'))
            await schema.add('lastDailyCollect', { 
                type: 'integer',
                configurable: false,
                default: 0,
            });
    }
}
