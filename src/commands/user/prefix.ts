import { Command, MessageCommandMeta, Spliscord, Message } from '../../commandUtil';

export default class implements Command {

    name = 'user.prefix';
    description = 'Set your user prefix to call the bot.';
    aliases = ['me.prefix'];
    usage = 'user.prefix {prefix}';

    cooldown = 3;
    permissions = 0;

    args = null;

    checks = {
        guildOnly: false,
    };

    async execute(client: Spliscord, message: Message, meta: MessageCommandMeta) {

        await client.userConf.updateById(message.author.id, { prefix: meta.args._[0] });

        if (!meta.args._[0])
            message.channel.send('Okay, I removed your user prefix. You can still use a guild prefix or a ping.');
        else
            message.channel.send(`Okay, I set your user prefix to \`${meta.args._[0]}\`.`);
    }

    init = null;
    shutdown = null;
}