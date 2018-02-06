import Event from '../interfaces/event';
import {Collection} from 'discord.js';
import * as parseArgs from 'minimist';

//TODO Add typescript PFM

const test: Event = {
    name: 'message',
    execute(client, message) {

        if (message.author.id === '1') return console.warn(message.content); // Clyde
        if (message.author.bot) return; // Bot


        const prefixes = [];


        //#region User Config
        const user = client.db.get('users')
            .find({ id: message.author.id })
            .value();

        if (user) {
            message.userConf = user;

            if (typeof user.prefix === 'string') prefixes.push(user.prefix);
        }
        //#endregion


        //#region Prefix Checking
        message.prefix = false;

        for (const thisPrefix of prefixes) {
            if (message.content.startsWith(thisPrefix)) message.prefix = thisPrefix;
        }

        message.prefix = (client.prefixMention.exec(message.content)) ? message.content.match(client.prefixMention)[0] : message.prefix;

        if (!message.prefix) return; // Prefix
        //#endregion


        //#region
        message.args = parseArgs(message.content.slice(message.prefix.length).split(/ +/g)); // Get Args 
        message.command = message.args._.shift().toLowerCase(); // Get Command Name

        const command = client.commands.get(message.command) ||
            client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(message.command));

        if (!command) return;
        //#endregion


        //#region Cooldowns
        if (!client.cooldowns.has(command.name)) { // Make cooldown collecions here instead of in Main()
            client.cooldowns.set(command.name, new Collection()); // Don't want to waste mem for commands never used
        }

        const now = Date.now(); // Used more then once so set to a const
        const timestamps = client.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000; // Three being the default timeout

        if (!timestamps.has(message.author.id)) {
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        } else {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.channel.send(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }
        //#endregion


        //#region Execute & Error Handler
        if (command.execute.constructor.name === 'AsyncFunction') {
            command.execute(client, message)
                .catch(error => {
                    console.error(error);
                    message.channel.send(`There was an error trying to execute the \`${command.name}\` command.`);
                });
        } else {
            try {
                command.execute(client, message);
            } catch (error) {
                console.error(error);
                message.channel.send(`There was an error trying to execute the \`${command.name}\` command.`);
            }
        }
        //#endregion
    },
}

export default test;