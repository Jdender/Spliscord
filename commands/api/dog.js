module.exports = {
    name: 'api.dog',
    aliases: ['api.woof','api.bark','api.doggo'],
    cooldown: 5,
    description: 'Get a random dog image from `random.dog`.',
    async execute(client, message) {

        const response = await client.phin({
            url: 'https://random.dog/woof.json',
            parse: 'json',
        });

        message.channel.send(response.body.url);

    },
};