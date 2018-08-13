import { applyOptions } from '../util/applyOptions';
import { Monitor, KlasaMessage } from 'klasa';
import { GuildMember } from 'discord.js';

@applyOptions({
    name: 'someone',
    ignoreOthers: false,
})
export default class extends Monitor {

    async run(message: KlasaMessage) {

        if (!message.guild) return;

        if (!message.guild.settings.get('allowSomeone')) return;

        if (!/@someone/i.test(message.content)) return;

        const someone = message.guild.members.random();

        if(!someone) return;

        message.send(this.getMention(someone));
    }

    private getMention = (someone: GuildMember) =>
        `<@${someone.id}>`;

    async init() {

        const { schema } = this.client.gateways.guilds;

        if (!schema) return;

        if (!schema.has('allowSomeone'))
            await schema.add('allowSomeone', { type: 'boolean' });
    }
}