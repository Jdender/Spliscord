import { Command, MessageCommandMeta, Spliscord, Message } from '../../commandUtil';

export default class implements Command {

    name = 'guild.prefix';
    description = 'Set the guild\'s prefix to call the bot.';
    aliases = ['this.prefix'];
    usage = 'guild.prefix [prefix]';

    cooldown = 3;
    permissions = 2;

    args = null;

    checks = {
        guildOnly: true,
    };

    async execute(client: Spliscord, message: Message, meta: MessageCommandMeta) {

        await client.guildConf.updateById(message.guild.id, { prefix: meta.args._[0] });

        if (!meta.args._[0])
            message.channel.send('Okay, I removed the guild\'s prefix. You can still use a guild prefix or a ping.');
        else
            message.channel.send(`Okay, I set the guild\'s prefix to \`${meta.args._[0]}\`.`);
    }

    init = null;
    shutdown = null;
}