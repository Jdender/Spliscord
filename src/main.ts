//#region Import
import { Client } from 'discord.js';
import Events from './modules/events';
import { Config } from './interfaces/config';
//#endregion

//#region Unpack/Init
const { on, once, registerEvents } = Events;
//#endregion

//#region Because typescript
class Spliscord extends Client {

    public prefixMention: RegExp;
    public inviteLink: string;

    public constructor(public config: Config) {
        super();
        registerEvents(this);
    }

    @once('ready')
    private _onceReady(): void {
        this.prefixMention = new RegExp(`^<@!?${client.user.id}> `);
        this.inviteLink = `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot`;
    }

    @on('ready')
    private _onReady(): void {
        console.info(`[info] Runing in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
    }

    @on('debug')
    private _onDebug(message: string): void {
        console.info(message);
    }

    @on('warn')
    private _onWarn(warning: string): void {
        console.warn(warning);
    }

    @on('error')
    private _onError(error: string): void {
        console.error(error);
    }
}
//#endregion

import config from './config';
const client = new Spliscord(config);