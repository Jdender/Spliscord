module.exports = {
    name: 'message',
    async execute(client, message) {

        if (message.author.id === '1') return console.warn(message.content); // Clyde
        if (message.author.bot) return; // Bot

        message.prefix = (client.prefixMention.exec(message.content)) ? message.content.match(client.prefixMention)[0] : false;
        if (!message.prefix) return;

        message.args = message.content.slice(message.prefix.length).split(/ +/g);
        message.command = message.args.shift().toLowerCase();

        if (!client.commands.has(message.command)) return;

        try {
            client.commands.get(message.command).execute(client, message);
        } catch (error) {
            console.error(error);
            message.channel.send('There was an error trying to execute that command.');
        }

    },
};