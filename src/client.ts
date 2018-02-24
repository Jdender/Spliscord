import { Client } from 'discord.js';
import { BotConfig } from './configs';
import { logger } from './logger';

@logger
export class Spliscord extends Client {

    prefixMention: RegExp;
    inviteLink: string;

    constructor(public config: BotConfig) {
        super(config.client);

        this.login(require(config.token.path)[config.token.name]);
    }
}