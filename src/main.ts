const version: string[] = process.version.slice(1).split('.');
if ((version[0] as any) < 8 || ((version[1] as any) < 9)) throw new Error('Node 8.9.0 or higher is required. Update Node.');

process.on('unhandledRejection', (e) => console.error(`Uncaught Promise Rejection:\n${e}`));

//#region Import
import { Client, Collection } from 'discord.js';
import Events from './modules/events';
import Config from './interfaces/config';
import walk from './modules/walk';
import { readdirAsync } from './modules/fsAsync';
import Command from './interfaces/command';
import * as low from 'lowdb';
import * as LowDbFileSync from 'lowdb/adapters/FileSync';
import { flattenDeep } from 'lodash';
//#endregion

//#region Unpack/Init
const { on, once, registerEvents: registerInClassEvents } = Events;
//#endregion

//#region Because typescript
class Spliscord extends Client {

    public prefixMention: RegExp;
    public inviteLink: string;

    public commands: Collection < string, Command > = new Collection();
    public cooldowns: Collection < string, any > = new Collection();

    public db = low(new LowDbFileSync('db.json'));
    public env = low(new LowDbFileSync('env.json'));

    public constructor(public config: Config) {
        super();

        this._initDB();
        registerInClassEvents(this);
        this._import();

        this.login(require(config.token.path)[config.token.name]);
    }

    private async _import(): Promise < void > {

        //#region Command Importer
        const rawCommandFiles: string[] = flattenDeep(await walk('./dist/commands/'));
        const commandFiles: string[] = rawCommandFiles.filter((file: string) => file.split('.')[2] !== 'map');

        console.info(`[init] [load] Loading ${commandFiles.length} commands.`);

        for (const file of commandFiles) {
            if (file.split('.')[1] !== 'js') return;

            const { default: command } = require(`../${file}`); // The `..` is needed.

            this.commands.set(command.name, command);
        }
        //#endregion

        //#region Event Importer
        const rawEventFiles: string[] = await readdirAsync('./dist/events/');
        const eventFiles: string[] = rawEventFiles.filter((file: string) => file.split('.')[2] !== 'map');

        console.info(`[init] [load] Loading ${eventFiles.length} events.`);

        for (const file of eventFiles) {
            if (file.split('.')[1] !== 'js') return;

            const { default: event } = require(`./events/${file}`);

            this.on(event.name, (...args) => event.execute(this, ...args));
        }
        //#endregion
    }

    private _initDB(): void {

        this.db.defaults({
                servers: [],
                users: [],
            })
            .write();

        this.env.defaults({
                comment: 'This file will be removed when the bot moves to the new db. For now it\'s using LowDB so it needs this.',
                stack: [],
            })
            .write();
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