import { Client, Message } from 'discord.js';
import { GuildConfig } from './settings';

interface PermsObject {
    level: number;
    name: string;
    guildOnly: boolean;
    check: (client: Client, message: Message, guildConf: GuildConfig) => boolean;
}

export class Auth {

    private perms: PermsObject[] = [
        {
            level: 0,
            name: 'User',
            guildOnly: false,
            check: () => true,
        },
        {
            level: 1,
            name: 'Server Moderator',
            guildOnly: true,
            check: (client, message, guildConf) => {

                if (!guildConf.modRole) return false;

                const role = message.guild.roles.get(guildConf.modRole);

                if (!role) return false;

                return message.member.roles.has(role.id);
            },
        },
        {
            level: 2,
            name: 'Server Administrator',
            guildOnly: true,
            check: (client, message, guildConf) => {

                if (!guildConf.adminRole) return false;

                const role = message.guild.roles.get(guildConf.adminRole);

                if (!role) return false;

                return message.member.roles.has(role.id);
            },
        },
        {
            level: 3,
            name: 'Server Owner',
            guildOnly: true,
            check: (client, message) => message.guild.owner.user.id === message.author.id,
        },
        {
            level: 4,
            name: 'Bot Support',
            guildOnly: false,
            check: (client, message) => this.checkContributors(client, message, 4),
        },
        {
            level: 5,
            name: 'Bot Dev',
            guildOnly: false,
            check: (client, message) => this.checkContributors(client, message, 5),
        },
        {
            level: 6,
            name: 'Bot Head',
            guildOnly: false,
            check: (client, message) => this.checkContributors(client, message, 6),
        },
    ];

    public checkPerms(client: Client, message: Message, guildConf: GuildConfig | 'DM') {
        let permLevel = 0;

        const perms = [...this.perms];

        while (perms.length) {

            const currentLevel = perms.pop()!;

            if (!message.guild && currentLevel.guildOnly)
                continue;

            if (currentLevel.check(client, message, guildConf as GuildConfig)) {
                permLevel = currentLevel.level;
                break;
            }
        }

        return permLevel;
    }

    private checkContributors(client: Client, message: Message, rank: number): boolean {
        return client.config.contributors.filter(contributor =>
            contributor.id === message.author.id && contributor.roles.includes(rank),
        )[0] != null;
    }
}
