import { Events } from './events';
import { Spliscord } from './client';
import { BotConfig } from './configs';
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

    execute: (client: Spliscord, message: CommandMessage) => Promise < void > | void;
    init: ((client: Spliscord) => Promise < void > | void) | null;
    shutdown: ((client: Spliscord) => Promise < void > | void) | null;
}

interface CommandMessage extends Message {
    command: string;
    permLevel: number;
    prefix: string;

    userConf: TODO;
    guildConf: TODO;
}


export function handler < T extends Constructor < Spliscord > > (Main: T) {
    class Handler extends Main {

        constructor(...args: any[]) {
            super(...args);
            registerEvents(this);
        }

        @on('message')
        handleOnMessage(message: CommandMessage): boolean {

            if (message.author.id === '1') return (console.warn(message.content), false); // Warn then Ignore Clyde
            if (message.author.bot) return false; // Ignore Bots
            if (message.guild.me.permissionsIn(message.channel).missing(['SEND_MESSAGES'])) return false; // Ignore if can't respond

            return true;
        }

    }
    return Handler;
}