import { Command, CommandMessage, Client, Message } from '../cmdUtil/commands.b';

const ping: Command = {
    name: 'ping',
    aliases: ['pong', 'latency'],
    cooldown: 3,
    description: 'Ping!',
    args: false,
    userConf: false,
    guildConf: false,
    guildOnly: false,
    async execute(client: Client, message: CommandMessage) {
        const pingMessage: Message = await message.channel.send('Pinging...') as any; // More `as any`

        pingMessage.edit(`Ponged. | The message ping is **${Math.abs(pingMessage.createdTimestamp - message.createdTimestamp)} ms**. ${client.ping ? `The heartbeat ping is **${Math.round(client.ping)} ms**.` : ''}`);
    },
}

export default ping;