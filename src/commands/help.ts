import { Command, MessageCommandMeta, Spliscord, Message } from '../commandUtil';

export default class implements Command {

    name = 'help';
    description = 'List all my commands or info about a specific command.';
    aliases = ['commands'];
    usage = 'help {command name}';

    cooldown = 10;
    permissions = 0;

    args = null;

    checks = {
        guildOnly: false,
    };

    async execute(client: Spliscord, message: Message, meta: MessageCommandMeta) {

        const data = [];

        if (!meta.args._.length) {

            data.push('Here\'s a list of all my commands:');
            data.push(client.commands.map(command => command.name).join(',\n'));
            data.push(`\nYou can send \`${meta.prefix}help [command name]\` to get info on a specific command.`);
            data.push(`\nYou can also say \`${meta.prefix}help [command alias]\` to get info on the command it's referencing.`);

            message.author.send(data.join('\n'), { split: true })
                .then(() => {
                    if (message.channel.type !== 'dm') {
                        message.channel.send('I\'ve sent you a DM with all my commands.');
                    }
                })
                .catch(() => message.channel.send('It seems like I can\'t DM you.'));

        } else {

            const command = client.commands.get(meta.args._[0]) ||
                client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(meta.args._[0]));

            if (!command)
                return message.channel.send('That\'s not a command I have.'), undefined;

            data.push(`**Name:** ${command.name}`);
            data.push(`**Description:** ${command.description}`);

            if (command.aliases.length) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
            if (command.usage) data.push(`**Usage:** ${meta.prefix}${command.name} ${command.usage}`);

            data.push(`**Cooldown:** ${command.cooldown} second(s)`);

            message.channel.send(data.join('\n'), { split: true });
        }

    }

    init = null;
    shutdown = null;
}