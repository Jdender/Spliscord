import { Command, MessageCommandMeta, Spliscord, Message } from '../commandUtil';

export default class implements Command {

    name = 'bing';
    description = 'Test the bot\'s latency.';
    aliases = ['crosbied'];
    usage = '';

    cooldown = 3;
    permissions = 0;

    args = null;

    checks = {
        guildOnly: false,
    };

    async execute(client: Spliscord, message: Message, meta: MessageCommandMeta) {

        const bingMessage = await message.channel.send('Binging...') as Message;

        bingMessage.edit(`Crosbied. | Our message round-trip ping is **${Math.abs(bingMessage.createdTimestamp - message.createdTimestamp)} ms**. ${client.ping ? `My heartbeat ping to discord is **${Math.round(client.ping)} ms**.` : ''}`);
    }

    init = null;
    shutdown = null;
}