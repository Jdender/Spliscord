import { Client, Collection } from 'discord.js';
import { BotConfig } from './configs';
import { logger } from './logger';
import { loader } from './loader';
import { handler, Command } from './handler';

@loader
@handler
@logger // Logger needs to be added first.

export class Spliscord extends Client {

    prefixMention: RegExp;
    inviteLink: string;

    commands = new Collection < string,
    Command > ();

    cooldowns = new Collection < string,
    Collection < string,
    number > > ();

    constructor(public config: BotConfig) {
        super(config.client);

        this.login(require(config.token.path)[config.token.name]);
    }
}