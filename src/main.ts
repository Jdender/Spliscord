import { Client } from 'discord.js';
import { Spliscord } from './client.i';
import { config } from './config';
import { handleCommand } from './handler';

const client = new Client(config.client) as Spliscord;

client.config = config;

client.on('ready', () => {
    console.info(`[info] Runing in ${client.channels.size} channels on ${client.guilds.size} guilds, for a total of ${client.users.size} users.`);

    client.prefixMention = new RegExp(`^<@!?${client.user.id}> `);
    client.inviteLink = `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot`;
});

client.on('debug', console.info);

client.on('warn', console.warn);

client.on('error', console.error);

client.on('message', message => handleCommand(client, message));

client.login(require(config.token.path)[config.token.name]);