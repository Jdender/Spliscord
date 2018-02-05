import { ClientOptions } from 'discord.js';

export interface TokenConfig {
    path: string;
    name: string;
}

export interface Config {
    token: TokenConfig;
    client: ClientOptions;
}