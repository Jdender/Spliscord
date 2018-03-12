import { Command, MessageCommandMeta, Spliscord, Message, clean } from '../../commandUtil';

export default class implements Command {

    name = 'dev.debug';
    description = 'Dump a `util.inspect()` of the message\'s `meta` to the channel.';
    aliases = ['debug'];
    usage = 'debug';

    cooldown = 3;
    permissions = 4;

    args = null;

    checks = {
        guildOnly: false,
    };

    async execute(client: Spliscord, message: Message, meta: MessageCommandMeta) {
        message.channel.send(
            await clean(client, meta, null)
        );
    }

    init = null;
    shutdown = null;

}