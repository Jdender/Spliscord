import { Repository } from 'typeorm';
import { Logger } from './logger';
import { GuildConfig, UserConfig } from './settings';

declare module 'discord.js' {

    interface Client {
        
        userConf: Repository<UserConfig>;
        guildConf: Repository<GuildConfig>;

        logger: Logger;

        prefixMention: RegExp;
        inviteLink: string;
    }
}
