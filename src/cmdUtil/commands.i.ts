import { Message } from 'discord.js';
import { UserConfig, GuildConfig } from '../client/config.i';
import { ParsedArgs } from 'minimist';

export interface Command {
    name: string;
    execute(...args: any[]): void | Promise < void > ;
    description: string;
    cooldown: number;
    args: boolean | number;
    guildOnly: boolean;
    userConf: boolean;
    guildConf: boolean;
    perms: number;
    aliases ? : string[];
    usage ? : string;
}

export interface CommandMessage extends Message {
    userConf: UserConfig;
    guildConf: GuildConfig;
    prefix: string;
    args: ParsedArgs;
    command: string;
}