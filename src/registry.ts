import { Collection, Message } from 'discord.js';
import { EventEmitter } from 'events';
import { Opts as MinimistOpts, ParsedArgs } from 'minimist';
import { GuildConfig, UserConfig } from './settings';

export interface Order {
    message: Message;

    command: string;
    permLevel: number;
    prefix: string;

    args: ParsedArgs;
    rawArgs: string[];

    userConf: UserConfig;
    guildConf: GuildConfig | 'DM';
}

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

interface RegistryEvents {
    on(event: string, listener: (order: Order) => void): this;
}

export class Registry extends EventEmitter implements RegistryEvents {

    private commands = new Collection<string, CommandMeta>();

    public addCommand(command: CommandMeta) {
        this.commands.set(command.name, command);
    }
}
