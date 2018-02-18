import { Command, CommandMessage, Client, Message, StorageTypeKeys } from '../../../cmdUtil/commands.b';

const set: Command = {
    name: 'config.guild.set',
    aliases: ['conf.guild.set', 'conf.g.set'],
    cooldown: 5,
    description: 'Use flags to set guild config options.',
    perms: 0,
    args: false,
    userConf: false,
    guildConf: true,
    guildOnly: true,
    execute(client: Client, message: CommandMessage) {
        let newSet = false;
        const reply: string[] = [];

        if (typeof message.args.prefix === 'string') {
            newSet = true;
            
            client.storage.dispatch({
                type: StorageTypeKeys.SET_GUILD_PREFIX,
                id: message.guild.id,
                prefix: message.args.prefix,
            });
            reply.push(`\`--prefix\`: Set this guild's prefix to "${message.args.prefix}"`)
        }

        if (typeof message.args.admin === 'string') {
            newSet = true;

            const role = message.guild.roles.get(message.args.admin);
            if (!role) {
                reply.push(`\`--admin\`: Unable to find role.`);
            } else {
                client.storage.dispatch({
                    type: StorageTypeKeys.SET_GUILD_ADMIN_ROLE,
                    id: message.guild.id,
                    role: message.args.admin,
                });
                reply.push(`\`--admin\`: Set this guild's admin role to "${role.name}"`);
            }
        }

        if (typeof message.args.mod === 'string') {
            newSet = true;

            const role = message.guild.roles.get(message.args.mod);
            if (!role) {
                reply.push(`\`--mod\`: Unable to find role.`);
            } else {

                client.storage.dispatch({
                    type: StorageTypeKeys.SET_GUILD_MOD_ROLE,
                    id: message.guild.id,
                    role: message.args.mod,
                });
                reply.push(`\`--mod\`: Set this guild's mod role to "${role.name}"`);
            }
        }

        if (newSet) {
            reply.push('Edited config saved to storage.');
            message.channel.send(reply);
        } else {
            message.channel.send('No flags found.');
        }

    },
}

export default set;