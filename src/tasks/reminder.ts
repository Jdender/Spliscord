import { applyOptions } from '../util/applyOptions';
import { Task, KlasaMessage } from 'klasa';

interface ReminderData {
    message: KlasaMessage;
    text: string;
}

@applyOptions({
    name: 'reminder',
})
export default class extends Task {

    async run ({ message, text }: ReminderData) {

        message.send(`<@${message.author.id}> You wanted me to remind you: ${text}`)
        
        .catch(() => message.author.send(`You wanted me to remind you: ${text}`))
        .catch(x => x);
    }
}