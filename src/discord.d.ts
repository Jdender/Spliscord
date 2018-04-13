import { Repository } from 'typeorm';
import { GuildConfig, UserConfig } from './settings';

declare module 'discord.js' {

    interface Client {

        userConf: Repository<UserConfig>;
        guildConf: Repository<GuildConfig>;
    }
}
