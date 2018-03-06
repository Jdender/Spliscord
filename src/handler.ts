import { Events } from './event-dec';
import { Spliscord } from './client';
import { UserConfig, GuildConfig } from './configs';
import { Constructor } from './oneline';
import { Message } from 'discord.js';
import isEqual = require('lodash/isEqual');
const { on, once, registerEvents } = Events;


export interface Command {
    name: string;
    description: string;
    aliases: string[];
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

    constructor(client: Spliscord, message: Message) {

        this.prefix = ',';

        this.command = this.findCommand(client, message);
    }

    private findCommand(client: Spliscord, message: Message): string {

        const split = message.content.slice(this.prefix.length).split(/\s+/g);
        const path = [];

        let command = '';

        for (let i = 0; i < client.config.maxSubCommandDepth && i < split.length; i++) {
            path.push(split[i]);

            for (const name of client.commandNameCache) {
                if (isEqual(path, name))
                    command = path.join('.');
            }
        }

        return command;
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
        async handleOnMessage(message: Message): Promise < boolean > {

            if (message.author.id === '1') return (console.warn(message.content), false); // Warn then Ignore Clyde
            if (message.author.bot) return false; // Ignore Bots

            const meta = new MessageCommandMeta(this, message);

            const command = this.commands.get(meta.command) || // The !! is casting to bool to toss the null type
                this.commands.find(cmd => !!cmd.aliases && cmd.aliases.includes(meta.command));

            if (!command) return false;


            try {

                if (command.execute.constructor.name === 'AsyncFunction')
                    await command.execute(this, message, meta)
                else
                    command.execute(this, message, meta);

                return true;

            } catch (error) {

                console.error(error);
                message.channel.send(`There was an error trying to execute the \`${command.name}\` command.`);

                return false;
            }

        }

    }
    return Handler;
}