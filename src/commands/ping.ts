import { Command } from '../cmdHandler/commands.i';

const ping: Command = {
    name: 'ping',
    aliases: ['pong', 'latency'],
    cooldown: 3,
    description: 'Ping!',
    async execute(client, message) {
        const pingMessage = await message.channel.send('Pinging...');

        pingMessage.edit(`Ponged. | Took **${Math.abs(pingMessage.createdTimestamp - message.createdTimestamp)} ms**.`);
    },
}

export default ping;