import { Client } from 'discord.js';

interface LoggerClient extends Client {
    prefixMention: RegExp;
    inviteLink: string;
}

export function logger(client: LoggerClient) {

    client.once('ready', () => {
        client.prefixMention = new RegExp(`^<@!?${client.user.id}> `);
        client.inviteLink = `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot`;
    });

    client.on('ready', () => {
        console.info(`[info] Runing in ${client.channels.size} channels on ${client.guilds.size} guilds, for a total of ${client.users.size} users.`);
    });

    client.on('debug', (message: string) => {
        console.info(message);
    });

    client.on('warn', (warning: string) => {
        console.warn(warning);
    });

    client.on('error', (error: string) => {
        console.error(error);
    });

}