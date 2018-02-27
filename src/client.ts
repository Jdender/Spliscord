import 'reflect-metadata';

import { Client, Collection } from 'discord.js';
import { BotConfig, UserConfig, GuildConfig } from './configs';
import { logger } from './logger';
import { loader } from './loader';
import { handler, Command } from './handler';
import { createConnection } from 'typeorm';

@loader
@handler
@logger // Logger needs to be added first.

export class Spliscord extends Client {

    prefixMention: RegExp;
    inviteLink: string;

    connection = createConnection({
        type: 'sqlite',
        database: './store.sqlite',
        entities: [
            UserConfig, GuildConfig
        ],
        synchronize: true,
    });

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