import { Collection, Message } from 'discord.js';
import { EventEmitter } from 'events';
import { Opts as MinimistOpts, ParsedArgs } from 'minimist';
import { GuildConfig, UserConfig } from './settings';

// This is the object commands get when ran
export interface Order {
    message: Message;

    command: CommandMeta;
    permLevel: number;
    prefix: string;

    args: ParsedArgs;
    rawArgs: string[];

    userConf: UserConfig;
    guildConf: GuildConfig | 'DM';
}

// This is the info of the command it's self
interface CommandMeta {
    name: string;
    description: string;
    aliases: string[];
    usage: string;

    cooldown: number;
    permissions: number;

    args: MinimistOpts | null;

    checks: {
        guildOnly: boolean;
    };
}

// To type the EventEmitter
export declare interface Registry {
    on(event: string, listener: (order: Order) => void): this;
    once(event: string, listener: (order: Order) => void): this;
}

// The Registry stores commands, may add more to it after
export class Registry extends EventEmitter {

    private commands = new Collection<string, CommandMeta>();

    public addCommand(command: CommandMeta) {
        this.commands.set(command.name, command);
    }

    public getCommand(name: string): CommandMeta {
        return this.commands.get(name)
        || this.commands.find(cmd => cmd.aliases.includes(name));
    }

    public get commandRawNames(): string[] {
        return this.commands
        .map(command => command.name);
    }

    public get commandNames(): string[] {
        return this.commandRawNames
        .concat(
            this.commands
            .map(command => command.aliases)
            .reduce((names, aliases) => names.concat(aliases)),
        );
    }

    public get commandNamesSplit(): string[][] {
        return this.commandNames
        .map(name => name.split('.'));
    }

}
