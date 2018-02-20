import { Message, Client } from 'discord.js';
import { ParsedArgs } from 'minimist';
import { UserConfig, GuildConfig } from './configs.i';

export interface Command < Spliscord extends Client > {
    name: string;

    description: string;
    aliases ? : string[];
    usage ? : string;

    cooldown: number;

    checks: {
        guildOnly: boolean;
        userConf: boolean;
        guildConf: boolean;
    }

    args: {
        type: 'none' | 'split' | 'minimist';
        options: any;
    }

    perms: number;

    execute(client: Spliscord, message: CommandMessage): void | Promise < void > ;
    init ? (client: Spliscord) : void | Promise < void > ;
    shutdown ? (client: Spliscord) : void | Promise < void > ;
}

export interface CommandMessage extends Message {
    userConf ? : UserConfig;
    guildConf ? : GuildConfig;
    prefix: string;
    args: ParsedArgs;
    cmdName: string;
    permLevel: number;
}

export interface CommandFile < Spliscord extends Client > {
    default: Command < Spliscord > ;
}