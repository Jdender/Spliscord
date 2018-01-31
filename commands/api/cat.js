module.exports = {
    name: 'api.cat',
    aliases: ['api.meow'],
    cooldown: 5,
    description: 'Get a random cat image from `random.cat`.',
    async execute(client, message) {

        const response = await client.phin({
            url: 'http://random.cat/meow',
            parse: 'json',
        });

        message.channel.send(response.body.file);

    },
};