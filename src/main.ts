const version: string[] = process.version.slice(1).split('.');
if ((version[0] as any) < 8 || ((version[1] as any) < 9)) throw new Error('Node 8.9.0 or higher is required. Update Node.');

process.on('unhandledRejection', (e) => console.error(`Uncaught Promise Rejection:\n${e}`));

//#region Import
import { Client } from 'discord.js';
import Events from './modules/events';
import Config from './interfaces/config';
import walk from './modules/walk';
import { readdirAsync } from './modules/fsAsync';
//#endregion

//#region Unpack/Init
const { on, once, registerEvents: registerInClassEvents } = Events;
//#endregion

//#region Because typescript
class Spliscord extends Client {

    public prefixMention: RegExp;
    public inviteLink: string;

    public constructor(public config: Config) {
        super();

        registerInClassEvents(this);
        this._register();

        this.login(require(config.token.path)[config.token.name]);
    }

    private async _register(): Promise < void > {

        //#region Event Importer
        const rawEventFiles = await readdirAsync('./dist/events/');
        const eventFiles = rawEventFiles.filter(file => file.split('.')[2] !== 'map');
        console.info(`[load] Loading ${eventFiles.length} events.`);

        for (const file of eventFiles) {
            if (file.split('.')[1] !== 'js') return;

            const { default: event } = require(`./events/${file}`);

            this.on(event.name, (...args) => event.execute(this, ...args));
        }
        //#endregion

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