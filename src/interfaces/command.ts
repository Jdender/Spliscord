import { Message } from 'discord.js';
import { UserConfig } from './config';
import { ParsedArgs } from 'minimist';

export interface Command {
    name: string;
    execute(...args: any[]): void | Promise < void > ;
    description: string;
    cooldown: number;
    aliases ? : string[];
    usage ? : string;
}

export interface CommandMessage extends Message {
    userConf: UserConfig;
    prefix: string;
    args: ParsedArgs;
    command: string;
}