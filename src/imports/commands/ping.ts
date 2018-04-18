import { Client, Message } from 'discord.js';

export default (client: Client) => {

    client.registry.addCommand({
        name: 'ping',
        description: 'Test the bot\'s latency.',
        aliases: ['pong', 'latency'],
        usage: '',
        cooldown: 3,
        permissions: 0,
        args: null,
        checks: {
            guildOnly: false,
        },
    });

    client.registry.on('ping', async ({message}) => {
        const pingMessage = await message.channel.send('Pinging...') as Message;

        // tslint:disable-next-line:max-line-length
        pingMessage.edit(`Ponged. | Our message round-trip ping is **${Math.abs(pingMessage.createdTimestamp - message.createdTimestamp)} ms**. ${client.ping ? `My heartbeat ping to discord is **${Math.round(client.ping)} ms**.` : ''}`);
    });
};
