module.exports = {
    name: 'config.user.init',
    cooldown: 5,
    description: 'Ping!',
    execute(client, message) {
        if (
            client.db.get('users')
            .find({ id: message.author.id })
            .value()
        ) {
            return message.channel.send('You alredy have a config.');
        }

        const config = {
            id: message.author.id
        };

        if (message.args.prefix) {

            config.prefix = message.args.prefix;

            message.channel.send(`[--prefix] Set your prefix to ${message.args.prefix}.`);
        }

        client.db.get('users')
            .push(config)
            .write()

        message.channel.send('Pushed a config onto the database for you.');
    },
};