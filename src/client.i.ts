import { Client, Collection, Snowflake } from 'discord.js';
import { Command } from './cmdUtil.i';
import { BotConfig } from './configs.i';

export interface Spliscord extends Client {
    config: BotConfig;

    commands: Collection < string,
    Command < Spliscord > > ;
    cooldowns: Collection < string,
    Collection < Snowflake,
    number >> ;

    prefixMention: RegExp;
    inviteLink: string;
}