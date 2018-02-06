import { ClientOptions } from 'discord.js';

interface TokenConfig {
    path: string;
    name: string;
}

export default interface Config {
    token: TokenConfig;
    client: ClientOptions;
}