import { Events } from './event-dec';
import { Spliscord } from './client';
import { UserConfig, GuildConfig } from './configs';
import { Constructor } from './oneline';
import { Message } from 'discord.js';
const { on, once, registerEvents } = Events;


export interface Command {
    name: string;
    description: string;
    aliases: string[] | null;
    usage: string;

    cooldown: number;
    permissions: number;

    checks: {
        guildOnly: boolean;
        guildConf: boolean;
        userConf: boolean;
    }

    execute: (client: Spliscord, message: Message, meta: MessageCommandMeta) => Promise < void > | void;
    init: ((client: Spliscord) => Promise < void > | void) | null;
    shutdown: ((client: Spliscord) => Promise < void > | void) | null;
}


export class MessageCommandMeta {

    constructor() {
        //TODO
    }

    command: string;
    permLevel: number;
    prefix: string;

    userConf: UserConfig;
    guildConf: GuildConfig;
}


export function handler < T extends Constructor < Spliscord > > (Main: T) {
    class Handler extends Main {

        constructor(...args: any[]) {
            super(...args);
            registerEvents(this);
        }

        @on('message')
        handleOnMessage(message: Message): boolean {

            if (message.author.id === '1') return (console.warn(message.content), false); // Warn then Ignore Clyde
            if (message.author.bot) return false; // Ignore Bots
            if (message.guild.me.permissionsIn(message.channel).missing(['SEND_MESSAGES'])) return false; // Ignore if can't respond

            return true;//TODO
        }

    }
    return Handler;
}