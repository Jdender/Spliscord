import { Client, Message } from 'discord.js';
import parseArgs = require('minimist');
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { filter, flatMap, groupBy, tap } from 'rxjs/operators';
import { Order } from '../../classes/registry';
import { GuildConfig, UserConfig } from '../../classes/settings';

async function getConf(client: Client, message: Message): Promise<[UserConfig, GuildConfig | 'DM']> {
    // Get userConf or make userConf
    const userConf: UserConfig = await client.userConf.findOneById(message.author.id)
    || await client.userConf.save({ id: message.author.id });

    // If dm set guildConf to 'DM'
    const guildConf: GuildConfig | 'DM' =
    (message.channel.type !== 'text') ? 'DM' :

    // Get guildConf or make guildConf
    await client.guildConf.findOneById(message.guild.id)
    || await client.guildConf.save({ id: message.guild.id });

    return [userConf, guildConf];
}

function getPrefix(
    client: Client, message: Message,
    userConf: UserConfig, guildConf: GuildConfig | 'DM',
    ): string | null {

    // No prefix in dms
    if (guildConf === 'DM')
        return '';

    // Find prefix if not dms

    // Var to store the resolved prefix
    let prefix = '';

    // Array to store found prefixes
    const prefixes: string[] = [];

    // If userConf has prefix push it
    if (userConf.prefix)
        prefixes.push(userConf.prefix);

    // If guildConf has prefix push it
    if (guildConf.prefix)
        prefixes.push(guildConf.prefix);

    // For each of the prefixes check if the message starts with it
    for (const thisPrefix of prefixes)
        if (message.content.startsWith(thisPrefix))
            prefix = thisPrefix;

    // Check to see if the message uses a mention prefix
    const mentionPrefix =
    (client.prefixMention.exec(message.content)) ?
    message.content.match(client.prefixMention) : false;

    // Use mention prefix otherwise use resolved prefix
    prefix = (mentionPrefix) ? mentionPrefix[0] : prefix;

    // If no prefix short circuit
    return prefix || null;
}

function getCommandName(client: Client, message: Message, prefix: string): [string, string[]] | null {

    // NOTE: This function is really inefficient and should be redone at some point

    const split =
    message.content
    .slice(prefix.length)
    .match(/(?:[^\s"]+|"([^"]*)")+/g)!
    .map(match => (/(?:[^\s"]+|"([^"]*)")+/g).exec(match))
    .map(match => match![1] == null ? match![0] : match![1]);

    const path: string[] = [];

    for (let i = 0; i <= client.config.maxSubCommandDepth && i <= split.length; i++) {
        path.push(split.shift()!);

        for (const name of client.registry.commandNamesSplit)
            if (path.equals(name))
                return [path.join('.'), split];
    }

    return null;
}

// TODO
function checkPerms(client: Client, message: Message, required: number): number | null {
    return 0;
}

// Put all the functions together to make an order
async function order(client: Client, message: Message): Promise<Order | null> {

    const [userConf, guildConf] = await getConf(client, message);

    const prefix = getPrefix(client, message, userConf, guildConf);

    if (!prefix) return null;

    const commandArgs = getCommandName(client, message, prefix);

    if (!commandArgs) return null;

    const [commandName, rawArgs] = commandArgs;

    const command = client.registry.getCommand(commandName);

    const permLevel = checkPerms(client, message, command.permissions);

    if (typeof permLevel !== 'number') return null;

    const args = parseArgs(rawArgs, command.args || undefined);

    return {
        message,
        command,
        permLevel,
        prefix,
        args,
        rawArgs,
        userConf,
        guildConf,
    };
}

// The the order stream
export default (client: Client) =>

    fromEvent<Message>(client, 'message')
    .pipe(
        filter(msg => !msg.author.bot), // Filter out bots
        flatMap(msg => order(client, msg)), // Map to orders
        filter((ord): ord is Order => ord !== null), // Filter out null orders
    )
    .subscribe(ord => {

        client.logger.cmd(
        // tslint:disable-next-line:max-line-length
        `${ord.message.author.username}(${ord.message.author.id}) ran ${ord.command.name} in ${ord.message.guild.name}(${ord.message.guild.id})`,
        );

        try {
            // Run command with order
            client.registry.emit(ord.command.name, ord);
        } catch (e) {

            client.logger.error(e);

            ord.message.channel.send(e.stack || e.message);
        }
    });
