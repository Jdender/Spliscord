import { applyOptions } from '../../util/applyOptions';
import { KlasaMessage, Command } from 'klasa';

@applyOptions({
    name: 'prefix',
    description: 'Change the command prefix the bot uses in your guild.',
    usage: '<reset|Prefix:string{1,10}>',
    permissionLevel: 6,
    runIn: ['text'],
    aliases: ['setprefix'],
    cooldown: 5,
})
export default class extends Command {

    async run(message: KlasaMessage, [prefix]: string[]) {

        if (prefix === 'reset') return this.reset(message);
        
        if (message.guild.settings.get('prefix') === prefix) throw 'This guild\'s prefix is already set to that.';
        
        await message.guild.settings.update('prefix', prefix);
        
		return message.send(`The prefix for this guild has been set to ${prefix}.`);
	}

	async reset(message: KlasaMessage) {

        await message.guild.settings.update('prefix', this.client.options.prefix);
        
		return message.send(`Switched back the guild's prefix back to \`${this.client.options.prefix}\`.`);
	}
}
