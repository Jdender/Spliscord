import { Client, Message } from 'discord.js';

// Requested by Carolina Low(363760127553044483)

export default (client: Client) => {

    client.registry.addCommand({
        name: 'bing',
        description: 'Test the bot\'s latency.',
        aliases: ['crosbied'],
        usage: '',
        cooldown: 3,
        permissions: 0,
        args: null,
        checks: {
            guildOnly: false,
        },
    });

    client.registry.on('bing', async ({message}) => {
        const pingMessage = await message.channel.send('Binging...') as Message;

        // tslint:disable-next-line:max-line-length
        await pingMessage.edit(`Crosbied. | Our message round-trip ping is **${Math.abs(pingMessage.createdTimestamp - message.createdTimestamp)} ms**. ${client.ping ? `My heartbeat ping to discord is **${Math.round(client.ping)} ms**.` : ''}`);
    });
};
