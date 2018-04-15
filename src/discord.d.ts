import { Repository } from 'typeorm';
import { Logger } from './logger';
import { Registry } from './registry';
import { GuildConfig, UserConfig } from './settings';

declare module 'discord.js' {

    interface Client {
        
        userConf: Repository<UserConfig>;
        guildConf: Repository<GuildConfig>;

        logger: Logger;
        registry: Registry;

        prefixMention: RegExp;
        inviteLink: string;
    }
}
