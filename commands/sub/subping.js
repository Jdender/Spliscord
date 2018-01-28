module.exports = {
    name: 'sub.ping',
    aliases: ['foo.pong'],
    cooldown: 3,
    description: 'Ping!',
    async execute(client, message) {
        const pingMessage = await message.channel.send('Pinging...');

        pingMessage.edit(`Ponged. | Took **${Math.abs(pingMessage.createdTimestamp - message.createdTimestamp)} ms**.`);
    },
};