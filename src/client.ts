import 'reflect-metadata';

import { Client, Collection } from 'discord.js';
import { BotConfig, UserConfig, GuildConfig } from './configs';
import { logger } from './logger';
import { loader } from './loader';
import { handler, Command } from './handler';
import { createConnection, getRepository, Repository, Connection } from 'typeorm';

@loader
@handler
@logger // Logger needs to be added first.

export class Spliscord extends Client {

    prefixMention: RegExp;
    inviteLink: string;

    connection: Connection;
    userConf: Repository < UserConfig > ;
    guildConf: Repository < GuildConfig > ;

    commandPointers = new Collection < string,
    string > ();

    commandNameCache: string[][] = [];

    commands = new Collection < string,
    Command > ();

    cooldowns = new Collection < string,
    Collection < string,
    number > > ();

    constructor(public config: BotConfig) {
        super(config.client);
    }

    async connect() {

        this.connection = await createConnection({
            name: 'spliscord',
            type: 'sqlite',
            database: './.data/store.sqlite',
            entities: [
                UserConfig, GuildConfig
            ],
            synchronize: true,
        });

        this.userConf = this.connection.getRepository(UserConfig);
        this.guildConf = this.connection.getRepository(GuildConfig);

        this.login(process.env.TOKEN);
    }
}