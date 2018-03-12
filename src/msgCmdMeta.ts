import { Spliscord } from './client';
import { Message } from 'discord.js';
import { GuildConfig, UserConfig } from './configs';
import isEqual = require('lodash/isEqual');
import { ParsedArgs } from 'minimist';

//  String space thing          /(?:[^\s"]+|"([^"]*)")+/g
//  Same but with `\`        /(?:[^\s"]+|"([^"\\]*(?:\\.[^"\\]*)*)")+/g

export class MessageCommandMeta {

    static async construct(client: Spliscord, message: Message): Promise < MessageCommandMeta > {

        let userConf = await client.userConf.findOneById(message.author.id);

        if (!userConf)
            userConf = await client.userConf.save({ id: message.author.id });


        let guildConf: GuildConfig | 'DM' | undefined;

        if (message.channel.type === 'text') {

            guildConf = await client.guildConf.findOneById(message.guild.id);

            if (!guildConf)
                guildConf = await client.guildConf.save({ id: message.guild.id });
        } else
            guildConf = 'DM';


        return new MessageCommandMeta(client, message, userConf, guildConf);
    }

    constructor(client: Spliscord, message: Message, userConf: UserConfig, guildConf: GuildConfig | 'DM') {

        this.userConf = userConf;
        this.guildConf = guildConf;

        this.prefix = this.getPrefix(client, message, userConf, guildConf);

        [this.command, this.rawArgs] = this.findCommand(client, message);
    }

    private getPrefix(client: Spliscord, message: Message, userConf: UserConfig, guildConf: GuildConfig | 'DM'): string {

        const prefixes: string[] = [];

        if (userConf.prefix)
            prefixes.push(userConf.prefix);

        if (typeof guildConf === 'object' && guildConf.prefix)
            prefixes.push(guildConf.prefix);


        let prefix = '';

        for (const thisPrefix of prefixes) {
            if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;
        }

        let mentionPrefix = (client.prefixMention.exec(message.content)) ? message.content.match(client.prefixMention) : false;

        prefix = (mentionPrefix) ? mentionPrefix[0] : prefix;

        if (guildConf === 'DM')
            prefix = '';

        else if (!prefix) throw { name: 'ShortCircuit', message: 'prefix' };

        return prefix;
    }

    private findCommand(client: Spliscord, message: Message): [string, string[]] {

        const split =
            message.content
            .slice(this.prefix.length)
            .multiSearch(/(?:[^\s"]+|"([^"]*)")+/g)
            .map(m => m[1] == null ? m[0] : m[1]);

        const path = [];

        for (let i = 0; i <= client.config.maxSubCommandDepth && i <= split.length; i++) {
            path.push(split.shift());

            for (const name of client.commandNameCache) {
                if (isEqual(path, name))
                    return [path.join('.'), split];
                // TODO Optimaze this thing
            }
        }

        throw { name: 'ShortCircuit', message: 'command' };
    }

    command: string;
    permLevel: number;
    prefix: string;

    args: ParsedArgs;
    rawArgs: string[];

    userConf: UserConfig;
    guildConf: GuildConfig | 'DM';

    done: boolean;
}