module.exports = {
    name: 'debug.arg',
    aliases: ['debug.args', 'debug.argtest', 'debug.argstest'],
    cooldown: 3,
    description: 'Test to see if args are working corectly.',
    async execute(client, message) {
        message.channel.send(JSON.stringify(message.args), { code: 'json' });
    },
};