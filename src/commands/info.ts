import { Command, MessageCommandMeta, Spliscord, Message } from '../commandUtil';

export default class implements Command {

    name = 'info';
    description = 'Get various links for the bot.';
    aliases = ['invite', 'link', 'links'];
    usage = '';

    cooldown = 3;
    permissions = 0;

    args = null;

    checks = {
        guildOnly: false,
    };

    async execute(client: Spliscord, message: Message, meta: MessageCommandMeta) {
        message.channel.send(
            `
**Spliscord** - Made by jdenderplays/House Master (Same person)

Invite Link: <${client.inviteLink}>
GitHub: <${require('../../package.json').homepage}>
            `
        )

    }

    init = null;
    shutdown = null;
}