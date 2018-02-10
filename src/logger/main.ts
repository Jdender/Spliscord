import { Events } from '../util/events';
import { Client } from 'discord.js';
const { on, once, registerEvents } = Events;

export class Logger extends Client {

    public prefixMention: RegExp;
    public inviteLink: string;

    constructor(...args: any[]) {
        super(...args);
    }

    public _registerEvents(): void {
        registerEvents(this);
    }

    @once('ready')
    private _onceReady(): void {
        this.prefixMention = new RegExp(`^<@!?${this.user.id}> `);
        this.inviteLink = `https://discordapp.com/oauth2/authorize?client_id=${this.user.id}&scope=bot`;
    }

    @on('ready')
    private _onReady(): void {
        console.info(`[info] Runing in ${this.channels.size} channels on ${this.guilds.size} servers, for a total of ${this.users.size} users.`);
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