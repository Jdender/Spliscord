import { Command, MessageCommandMeta, Spliscord, Message, clean } from '../commandUtil';

export default class implements Command {

    name = 'debug';
    description = 'Debug';
    aliases = ['sub.debug'];
    usage = 'debug ';

    cooldown = 3;
    permissions = 0;

    args = {
        type: 'minimist' as 'minimist', // Bug of typescript, is a workaround.
    };

    checks = {
        guildOnly: false,
        guildConf: false,
        userConf: false,
    };

    async execute(client: Spliscord, message: Message, meta: MessageCommandMeta) {
        message.channel.send(
            await clean(client, meta, null)
        );
    }

    init = null;
    shutdown = null;

}