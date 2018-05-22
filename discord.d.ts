import { Repository } from 'typeorm';
import { Auth } from './src/core/auth';
import { Logger } from './src/core/logger';
import { Registry } from './src/core/registry';
import { BotConfig, GuildConfig, UserConfig } from './src/core/settings';

declare module 'discord.js' {

    interface Client {
        config: BotConfig;

        userConf: Repository<UserConfig>;
        guildConf: Repository<GuildConfig>;

        auth: Auth;
        logger: Logger;
        registry: Registry;

        prefixMention: RegExp;
        inviteLink: string;
    }
}
