module.exports = {
    name: 'message',
    async execute(client, message) {

        if (message.author.id === '1') return console.warn(message.content); // Clyde
        if (message.author.bot) return; // Bot

    },
};