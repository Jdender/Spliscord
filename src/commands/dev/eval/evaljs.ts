import { Command, CommandMessage, Client, Message } from '../../../cmdUtil/commands.b';

const clean = text => (typeof text === 'string') ? text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203)) : text;

const evaljs: Command = {
    name: 'dev.eval.js',
    aliases: ['sudo.eval.js'],
    cooldown: 3,
    description: '$',
    perms: 5,
    args: true,
    userConf: false,
    guildConf: false,
    guildOnly: false,
    execute(client: Client, message: CommandMessage) {
        try {
            const args = message.channel.type === 'text' ? message.content.slice(message.prefix.length).split(/ +/g) : message.content.split(/ +/g);
            args.shift();
            const code = args.join(' ');
            let evaled = eval(code);

            if (typeof evaled !== 'string')
                evaled = require('util').inspect(evaled);

            message.channel.send(clean(evaled), { code: 'xl' });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    },
}

export default evaljs;