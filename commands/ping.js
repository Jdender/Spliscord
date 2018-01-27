module.exports = {
    name: 'ping',
    description: 'Ping!',
    async execute(client, message) {
        const pingMessage = await message.channel.send('Pinging...');

        pingMessage.edit(`Ponged. | Took **${Math.abs(pingMessage.createdTimestamp - message.createdTimestamp)} ms**.`);
    },
};