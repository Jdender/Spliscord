import { Events } from './event-dec';
import { Spliscord } from './client';
import { Constructor } from './oneline';
import { Message, Collection } from 'discord.js';
import { MessageCommandMeta } from './msgCmdMeta';
import { Opts as MinimistOpts } from 'minimist';
import parseArgs = require('minimist');
import { permCheck } from './perms';
const { on, once, registerEvents } = Events;


export interface Command {
    name: string;
    description: string;
    aliases: string[];
    usage: string;

    cooldown: number;
    permissions: number;

    args: MinimistOpts | null;

    checks: {
        guildOnly: boolean;
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


            //#region Prepossessing checks
            if (message.author.id === '1') return console.warn(message.content), false; // Warn then Ignore Clyde
            if (message.author.bot) return false; // Ignore Bots
            //#endregion


            //#region Gen/Get meta
            let meta: MessageCommandMeta;

            try {
                meta = await MessageCommandMeta.construct(this, message);
            } catch (e) {
                if (e.name === 'ShortCircuit') return false;
                else throw e;
            }
            //#endregion


            //#region Find command
            const command = this.commands.get(meta.command) || // The !! is casting to bool to toss the null type
                this.commands.find(cmd => !!cmd.aliases && cmd.aliases.includes(meta.command));

            if (!command) return false;
            //#endregion


            //#region Cooldowns
            if (!this.cooldowns.has(command.name)) { // Make cooldown collecions here
                this.cooldowns.set(command.name, new Collection < string, any > ()); // Don't want to waste mem for commands never used
            }

            const now = Date.now(); // Used more then once so set to a const
            const timestamps = this.cooldowns.get(command.name) !;
            const cooldownAmount = command.cooldown * 1000;

            if (!timestamps.has(message.author.id)) {
                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            } else {
                const expirationTime = timestamps.get(message.author.id) !+cooldownAmount;

                if (now < expirationTime)
                    return message.channel.send(`Please wait ${((expirationTime - now) / 1000).toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`), false;

                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            }
            //#endregion


            //#region Args, checks and perms
            meta.permLevel = permCheck(this, message, meta);

            if (meta.permLevel < command.permissions)
                return message.channel.send(`You do not have permission to use this command. You have perm level ${meta.permLevel} and need ${command.permissions}.`), false;


            if ((meta.guildConf === 'DM') && command.checks.guildOnly)
                return message.channel.send('That command can only be used in a guild, not DMs.'), false;


            meta.args = parseArgs(meta.rawArgs, command.args || undefined);
            //#endregion


            //#region Exec command
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
            //#endregion

        }

    }
    return Handler;
}