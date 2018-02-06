import { ClientOptions } from 'discord.js';

export interface TokenConfig {
    path: string;
    name: string;
}

export interface BotConfig {
    token: TokenConfig;
    client: ClientOptions;
}

export interface UserConfig {
    id: string;
    prefix ? : string;
}