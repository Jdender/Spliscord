import { applyOptions } from '../util/applyOptions';
import { Monitor, KlasaMessage } from 'klasa';

@applyOptions({
    name: 'someone',
    ignoreOthers: false,
})
export default class extends Monitor {

    async run(message: KlasaMessage) {

        if (!message.guildConfigs.get('allowSomeone')) return;

        if (!/@someone/.test(message.content)) return;

        message.send(this.getMention(message));
    }

    private getMention = (message: KlasaMessage) =>
        `<@${message.guild.members.random().id}>`;

    async init() {

        const { schema } = this.client.gateways.guilds;

        if (!schema) return;

        if (!schema.has('allowSomeone'))
            await schema.add('allowSomeone', { type: 'boolean' });
    }
}