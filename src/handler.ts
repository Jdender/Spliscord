import { Events } from './event-dec';
import { Spliscord } from './client';
import { Constructor } from './oneline';
import { Message } from 'discord.js';
import { MessageCommandMeta } from './msgCmdMeta';
import { Opts } from 'minimist';
const { on, once, registerEvents } = Events;


interface MinimistArgs extends Opts {
    type: 'minimist';
}

type ArgOptions = null |
    MinimistArgs;


export interface Command {
    name: string;
    description: string;
    aliases: string[];
    usage: string;

    cooldown: number;
    permissions: number;

    args: ArgOptions; //TODO Add minimist thing

    checks: {
        guildOnly: boolean;
        guildConf: boolean;
        userConf: boolean;
    }

    execute: (client: Spliscord, message: Message, meta: MessageCommandMeta) => Promise < void > | void;
    init: ((client: Spliscord) => Promise < void > | void) | null;
    shutdown: ((client: Spliscord) => Promise < void > | void) | null;
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

            let meta: MessageCommandMeta;

            try {
                meta = await MessageCommandMeta.construct(this, message);
            } catch (e) {
                if (e.name === 'ShortCircuit') return false;
                else throw e;
            }

            const command = this.commands.get(meta.command) || // The !! is casting to bool to toss the null type
                this.commands.find(cmd => !!cmd.aliases && cmd.aliases.includes(meta.command));

            if (!command) return false;


            console.log(`[cmd] ${message.author.username}(${message.author.id}) ran ${meta.command}`);


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