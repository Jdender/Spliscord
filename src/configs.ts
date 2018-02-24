import { ClientOptions } from 'discord.js';

export interface BotConfig {
    token: {
        path: string;
        name: string;
    };
    client: ClientOptions;
    contributors: {
        name: string;
        id: string;
        roles: number[];
    }[];
}

export interface UserConfig {
    id: string;
    prefix: string | null;
}

export interface GuildConfig {
    id: string;
    prefix: string | null;
    adminRole: string | null;
    modRole: string | null;
}