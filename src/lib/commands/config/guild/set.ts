import { Command, CommandMessage, Client, Message, StorageTypeKeys } from '../../../cmdUtil/commands.b';

const set: Command = {
    name: 'config.guild.set',
    aliases: ['conf.guild.set', 'conf.g.set'],
    cooldown: 5,
    description: 'Use flags to set guild config options.',
    args: false,
    userConf: false,
    guildConf: true,
    guildOnly: true,
    execute(client: Client, message: CommandMessage) {
        
        if (typeof message.args.prefix === 'string') {
            client.storage.dispatch({
                type: StorageTypeKeys.SET_GUILD_PREFIX,
                id: message.guild.id,
                prefix: message.args.prefix,
            });
        }
    },
}

export default set;