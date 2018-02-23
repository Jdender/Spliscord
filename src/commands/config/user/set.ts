import { Command, CommandMessage, Client, Message, StorageTypeKeys } from '../../../cmdUtil/commands.b';

const set: Command = {
    name: 'config.user.set',
    aliases: ['conf.user.set', 'conf.u.set'],
    cooldown: 5,
    description: 'Use flags to set user config options.',
    perms: 0,
    args: false,
    userConf: true,
    guildConf: false,
    guildOnly: false,
    execute(client: Client, message: CommandMessage) {
        
        if (typeof message.args.prefix === 'string') {
            client.storage.dispatch({
                type: StorageTypeKeys.SET_USER_PREFIX,
                id: message.author.id,
                prefix: message.args.prefix,
            });
        }
    },
}

export default set;