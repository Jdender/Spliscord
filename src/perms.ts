import { MessageCommandMeta } from './handler';
import { Message } from 'discord.js';
import { Spliscord } from './client';
import includes = require('lodash/includes');

interface PermsObject {
    level: number;
    name: string;
    guildOnly: boolean;
    check: (client: Spliscord, message: Message, meta: MessageCommandMeta) => boolean;
}

export function permCheck(client: Spliscord, message: Message, meta: MessageCommandMeta) {
    let permLevel = 0;

    let _perms: PermsObject[] = [...perms];

    while (_perms.length) {
        const currentLevel = _perms.pop() as PermsObject;
        if (!message.guild && currentLevel.guildOnly) continue;
        if (currentLevel.check(client, message, meta)) {
            permLevel = currentLevel.level;
            break;
        }
    }
    return permLevel;
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
        check: (client, message) => false, //TODO
    },
    {
        // Admin of the server.
        level: 2,
        name: 'Server Administrator',
        guildOnly: true,
        check: (client, message) => false, //TODO
    },
    {
        // Owner of the server.
        level: 3,
        name: 'Server Owner',
        guildOnly: true,
        check: (client, message) => message.guild.owner.user.id === message.author.id,
    },
    {
        // Bot Support is a special inbetween level that has the equivalent of server owner access
        // to any server they joins, in order to help troubleshoot the bot on behalf of owners.
        level: 4,
        name: 'Bot Support',
        guildOnly: false,
        check: (client, message) => client.config.contributors.filter(contributor => contributor.id === message.author.id && includes(contributor.roles,4))[0] == null,
    },
    {
        // Bot Dev has some limited access like rebooting the bot or eval.
        level: 5,
        name: 'Bot Dev',
        guildOnly: false,
        check: (client, message) => client.config.contributors.filter(contributor => contributor.id === message.author.id && includes(contributor.roles,5))[0] == null,
    },
    {
        // The power that be. Bot Heads have every permisson.
        level: 6,
        name: 'Bot Head',
        guildOnly: false,
        check: (client, message) => client.config.contributors.filter(contributor => contributor.id === message.author.id && includes(contributor.roles,6))[0] == null,
    }
];