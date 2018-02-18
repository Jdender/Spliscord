import {
    Client,
    CommandMessage,
    Store,
    TypeKeys,
} from './perms.b';

export interface PermsClient extends Client {
    config: any;
    storage: Store < any > ;
}

export interface PermsObject {
    level: number;
    name: string;
    guildOnly: boolean;
    check: (PermsClient, CommandMessage) => boolean;
}

export const perms: PermsObject[] = [{
        // Non-roled users.
        level: 0,
        name: 'User',
        guildOnly: false,
        check: () => true,
    },
    {
        // Moderator of the server.
        level: 1,
        name: 'Server Moderator',
        guildOnly: true,
        check: (client: PermsClient, message: CommandMessage) =>
            (client.storage.getState().guilds[message.guild.id] && client.storage.getState().guilds[message.guild.id].modRole) ?
            message.member.roles.has(client.storage.getState().guilds[message.guild.id].modRole) : true,
    },
    {
        // Admin of the server.
        level: 2,
        name: 'Server Administrator',
        guildOnly: true,
        check: (client: PermsClient, message: CommandMessage) =>
        (client.storage.getState().guilds[message.guild.id] && client.storage.getState().guilds[message.guild.id].adminRole) ?
        message.member.roles.has(client.storage.getState().guilds[message.guild.id].adminRole) : true,
    },
    {
        // Owner of the server.
        level: 3,
        name: 'Server Owner',
        guildOnly: true,
        check: (client: PermsClient, message: CommandMessage) => message.guild.owner.user.id === message.author.id,
    },
    {
        // Bot Support is a special inbetween level that has the equivalent of server owner access
        // to any server they joins, in order to help troubleshoot the bot on behalf of owners.
        level: 4,
        name: 'Bot Support',
        guildOnly: false,
        check: (client: PermsClient, message: CommandMessage) => client.config.contributors.filter(contributor => contributor.id === message.author.id && contributor.roles.includes(4))[0],
    },
    {
        // Bot Dev has some limited access like rebooting the bot or eval.
        level: 5,
        name: 'Bot Dev',
        guildOnly: false,
        check: (client: PermsClient, message: CommandMessage) => client.config.contributors.filter(contributor => contributor.id === message.author.id && contributor.roles.includes(5))[0],
    },
    {
        // The power that be. Bot Heads have every permisson.
        level: 6,
        name: 'Bot Head',
        guildOnly: false,
        check: (client: PermsClient, message: CommandMessage) => client.config.contributors.filter(contributor => contributor.id === message.author.id && contributor.roles.includes(6))[0],
    }
];