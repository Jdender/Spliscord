import { Repository } from 'typeorm';
import { Auth } from './src/classes/auth';
import { Logger } from './src/classes/logger';
import { Registry } from './src/classes/registry';
import { BotConfig, GuildConfig, UserConfig } from './src/classes/settings';

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
