import { Repository } from 'typeorm';
import { Logger } from './classes/logger';
import { Registry } from './classes/registry';
import { GuildConfig, UserConfig, BotConfig } from './classes/settings';

declare module 'discord.js' {

    interface Client {
        config: BotConfig;
        
        userConf: Repository<UserConfig>;
        guildConf: Repository<GuildConfig>;

        logger: Logger;
        registry: Registry;

        prefixMention: RegExp;
        inviteLink: string;
    }
}
