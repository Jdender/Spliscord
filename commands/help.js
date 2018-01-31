module.exports = {
    name: 'help',
    description: 'List all my commands or info about a specific command.',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,
    execute(client, message) {

        const data = [];

        if (!message.args._.length) {

            data.push('Here\'s a list of all my commands:');
            data.push(client.commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${message.prefix}help [command name]\` to get info on a specific command.`);

            message.author.send(data.join('\n'), { split: true })
                .then(() => {
                    if (message.channel.type !== 'dm') {
                        message.channel.send('I\'ve sent you a DM with all my commands.');
                    }
                })
                .catch(() => message.channel.send('It seems like I can\'t DM you.'));

        } else {

            const command = client.commands.get(message.args._[0]) ||
                client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(message.args._[0]));

            if (!command) return message.channel.send('That\'s not a command I have.');

            data.push(`**Name:** ${command.name}`);

            if (command.description) data.push(`**Description:** ${command.description}`);
            if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
            if (command.usage) data.push(`**Usage:** ${message.prefix}${command.name} ${command.usage}`);

            data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

            message.channel.send(data.join('\n'), { split: true });
        }

    },
};