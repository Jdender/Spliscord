import { applyOptions } from '../../../util/applyOptions';
import { Command, CommandOptions, KlasaMessage } from 'klasa';

import fetch from 'node-fetch';

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

        const editMsg = await message.send('Thinking...') as KlasaMessage;

        // Fetch yesno.wtf and load page as json
        const yesno = await fetch('https://yesno.wtf/api')
            .then(response => response.json())
            .then(response => response as YesnoResponse)
            .catch(() => null); // Null if error

        return editMsg.edit(yesno
            ? {
                content: yesno.answer === 'yes' ? 'Yes' : 'No',
                files: [{
                    // Make attachment with same file ext
                    attachment: yesno.image,
                    name: `yesno${yesno.image.slice(yesno.image.lastIndexOf('.'), yesno.image.length)}`,
                }]
            }
            : 'The api was unable to decide.'
        ) as Promise<KlasaMessage>;
    }

}