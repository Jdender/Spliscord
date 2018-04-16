import { Client, Message } from 'discord.js';

interface PermsObject {
    level: number;
    name: string;
    guildOnly: boolean;
    check: (client: Client, message: Message) => boolean;
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
            check: (client, message) => false, // TODO
        },
        {
            level: 2,
            name: 'Server Administrator',
            guildOnly: true,
            check: (client, message) => false, // TODO
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

    public checkPerms(client: Client, message: Message) {
        let permLevel = 0;

        const perms = [...this.perms];

        while (perms.length) {

            const currentLevel = perms.pop()!;

            if (!message.guild && currentLevel.guildOnly)
                continue;

            if (currentLevel.check(client, message)) {
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
