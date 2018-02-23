import {
    Message,
    UserConfig,
    GuildConfig,
    ParsedArgs,
    CommandMessage,
    Client,
    DJSClient,
} from './commands.b';

export interface Command {
    name: string;
    execute(client: Client, message: CommandMessage): void | Promise < void > ;
    init ? (client: DJSClient) : void | Promise < void > ;
    shutdown ? (client: DJSClient) : void | Promise < void > ;
    description: string;
    cooldown: number;
    args: boolean | number;
    guildOnly: boolean;
    userConf: boolean;
    guildConf: boolean;
    perms: number;
    aliases ? : string[];
    usage ? : string;
}

export interface CommandMessage extends Message {
    userConf: UserConfig;
    guildConf: GuildConfig;
    prefix: string;
    args: ParsedArgs;
    command: string;
    permLevel: number;
}

export interface CommandFile {
    default: Command;
}