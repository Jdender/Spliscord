import { Command, MessageCommandMeta, Spliscord, Message } from '../commandUtil';

export default class implements Command {

    name = 'ping';
    description = 'Test the bot\'s latency.';
    aliases = ['pong', 'latency'];
    usage = '';

    cooldown = 3;
    permissions = 0;

    args = null;

    checks = {
        guildOnly: false,
    };

    async execute(client: Spliscord, message: Message, meta: MessageCommandMeta) {

        const pingMessage = await message.channel.send('Pinging...') as Message;

        pingMessage.edit(`Ponged. | Our message round-trip ping is **${Math.abs(pingMessage.createdTimestamp - message.createdTimestamp)} ms**. ${client.ping ? `My heartbeat ping to discord is **${Math.round(client.ping)} ms**.` : ''}`);
    }

    init = null;
    shutdown = null;
}