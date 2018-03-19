import { Command, MessageCommandMeta, Spliscord, Message, clean } from '../../../commandUtil';

export default class implements Command {

    name = 'dev.eval.js';
    description = 'Eval js in the bot\'s context.';
    aliases = [];
    usage = '{...code}';

    cooldown = 3;
    permissions = 5;

    args = null;

    checks = {
        guildOnly: false,
    };

    async execute(client: Spliscord, message: Message, meta: MessageCommandMeta) {
        try {
            const args = message.channel.type === 'text' ? message.content.slice(meta.prefix.length).split(/\s+/g) : message.content.split(/\s+/g);
            args.splice(0, 3);
            const code = args.join(' ');
            let evaled = eval(code);

            message.channel.send(await clean(client, evaled), { code: 'xl' });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${await clean(client, err)}\n\`\`\``);
        }
    }

    init = null;
    shutdown = null;
}