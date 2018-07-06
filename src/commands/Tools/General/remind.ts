import { applyOptions } from '../../../util/applyOptions';
import { Command, KlasaMessage } from 'klasa';

@applyOptions({
    name: 'remind',
    description: 'Get the fisrt url that shows up from searching a query.',
    usage: '<When:time> <Reminder:string> [...]',
    usageDelim: ' ',
    aliases: ['reminder', 'remindme'],
})
export default class extends Command {

    async run(message: KlasaMessage, [when, ...text]: string[]) {

        const reminder = await this.client.schedule.create('reminder', when, {
			data: {
                message,
                text,
			},
        });
        
		return message.send(`Okay, I created you a reminder with the id: \`${reminder.id}\``);
    }
}
