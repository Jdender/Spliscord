import { Command, CommandMessage, Client, Message } from '../cmdHandler/commands.b';

const ping: Command = {
    name: 'ping',
    aliases: ['pong', 'latency'],
    cooldown: 3,
    description: 'Ping!',
    async execute(client: Client, message: CommandMessage) {
        const pingMessage: Message = await message.channel.send('Pinging...') as any; // More `as any`

        pingMessage.edit(`Ponged. | Took **${Math.abs(pingMessage.createdTimestamp - message.createdTimestamp)} ms**.`);
    },
}

export default ping;