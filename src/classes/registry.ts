import { Collection, Message } from 'discord.js';
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

interface Events {
    [index: string]: Array<(order: Order) => Promise<any>>;
}

// The Registry stores commands, may add more to it after
export class Registry {

    private commands = new Collection<string, CommandMeta>();

    private events: Events = {};

    public on(event: string, listener: (order: Order) => Promise<any>): this {

        if (!this.events[event])
            this.events[event] = [];

        this.events[event].push(listener);

        return this;
    }

    public async emit(event: string, order: Order) {

        const listeners = this.events[event];

        if (listeners)
        for (const listener of listeners)
        try {
            await listener(order);
        } catch (e) {
            return e;
        }
    }

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
