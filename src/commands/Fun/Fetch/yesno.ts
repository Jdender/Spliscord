import { applyOptions } from '../../../util/applyOptions';
import { Command, CommandOptions, KlasaMessage } from 'klasa';
import { FunMisc } from '../../../services/FunMisc';

interface YesnoResponse {
    image: string;
    answer: string;
}

@applyOptions<CommandOptions>({
    name: 'yesno',
    description: 'Get a yes or no and a image to go with it.',
})
export default class extends Command {

    async run(message: KlasaMessage) {

        const yesno = await FunMisc.fetchJson('https://yesno.wtf/api', res => res as YesnoResponse);

        return message.send(yesno
            ? {
                content: yesno.answer === 'yes' ? 'Yes' : 'No',
                files: [FunMisc.makeAttachment('yesno', yesno.image)]
            }
            : 'The api was unable to decide.'
        );
    }

}