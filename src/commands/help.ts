import { Command, CommandMessage, Client } from '../cmdUtil/commands.b';

const help: Command = {
    name: 'help',
    description: 'List all my commands or info about a specific command.',
    aliases: ['commands'],
    usage: '[command name]',
    perms: 0,
    cooldown: 5,
    args: false,
    userConf: false,
    guildConf: false,
    guildOnly: false,
    execute(client: Client, message: CommandMessage) {

        const data = [];

        if (!message.args._.length) {

            data.push('Here\'s a list of all my commands:');
            data.push(client.commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${message.prefix}help [command name]\` to get info on a specific command.`);
            data.push(`\nYou can also say \`${message.prefix ? message.prefix : ''}help [command alias]\` to get info on the command it's referencing.`);

            message.author.send(data.join('\n'), { split: true })
                .then(() => {
                    if (message.channel.type !== 'dm') {
                        message.channel.send('I\'ve sent you a DM with all my commands.');
                    }
                })
                .catch(() => message.channel.send('It seems like I can\'t DM you.'));

        } else {

            const command = client.commands.get(message.args._[0]) ||
                client.commands.find((cmd: any) => cmd.aliases && cmd.aliases.includes(message.args._[0]));

            if (!command) {
                message.channel.send('That\'s not a command I have.');
                return;
            } 

            data.push(`**Name:** ${command.name}`);

            if (command.description) data.push(`**Description:** ${command.description}`);
            if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
            if (command.usage) data.push(`**Usage:** ${message.prefix}${command.name} ${command.usage}`);

            data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

            message.channel.send(data.join('\n'), { split: true });
        }

    },
}

export default help;