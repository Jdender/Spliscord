import { ClientOptions, Snowflake } from 'discord.js';

export interface BotConfig {
    token: {
        path: string;
        name: string;
    };
    client: ClientOptions;
    contributors: {
        name: string;
        id: Snowflake;
        roles: number[];
    }[];
}

export interface UserConfig {
    id: Snowflake;
    prefix ? : string;
}

export interface GuildConfig {
    id: Snowflake;
    prefix ? : string;
    adminRole: Snowflake;
    modRole: Snowflake;
}
