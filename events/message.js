module.exports = {
    name: 'message',
    async execute(client, message) {

        if (message.author.id === '1') return console.warn(message.content); // Clyde
        if (message.author.bot) return; // Bot

        message.prefix = (client.prefixMention.exec(message.content)) ? message.content.match(client.prefixMention)[0] : false;
        if (!message.prefix) return; // Prefix

        message.args = message.content.slice(message.prefix.length).split(/ +/g); // Get Args
        message.command = message.args.shift().toLowerCase(); // Get Command Name

        if (!client.commands.has(message.command)) return; // Command Name

        const command = client.commands.get(message.command); // Get Command

        if (command.args === true && !message.args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}.`);
        }

        if (typeof command.args === 'number' && message.args.length !== command.args) {
            let reply = `You didn't provide enough arguments, ${message.author}. This command is expecting ${command.args}.`;

            if (command.usage) {
                reply += `\nThe proper usage would be: \`${message.prefix}${command.name} ${command.usage}\``;
            }

            return message.channel.send(reply);
        }

        //#region Cooldowns
        if (!client.cooldowns.has(command.name)) { // Make cooldown collecions here instead of in Main()
            client.cooldowns.set(command.name, new client.discord.Collection()); // Don't want to waste mem for commands never used
        }

        const now = Date.now(); // Used more then once so set to a const
        const timestamps = client.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000; // Three being the default timeout

        if (!timestamps.has(message.author.id)) {
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        } else {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.channel.send(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }
        //#endregion

        try {
            command.execute(client, message);
        } catch (error) {
            console.error(error);
            message.channel.send(`There was an error trying to execute the \`${command.name}\` command.`);
        }

    },
};