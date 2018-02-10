//#region Because barrels
import {
    Collection,
    BotConfig,
    walk,
    readdirAsync,
    Command,
    low,
    LowDbFileSync,
    flattenDeep,
    Logger,
    executeCmd
} from './client.b';
//#endregion

//#region Because typescript
export default class Spliscord extends Logger {

    public commands: Collection < string, Command > = new Collection();
    public cooldowns: Collection < string, Collection < string, any > > = new Collection();

    public db = low(new LowDbFileSync('db.json'));
    public env = low(new LowDbFileSync('env.json'));

    public constructor(public config: BotConfig) {
        super();

        this._initDB();
        this._registerEvents();
        this._import();

        this.on('message', (message: any) => executeCmd(this, message));

        this.login(require(config.token.path)[config.token.name]);
    }

    private async _import(): Promise < void > {

        //#region Command Importer
        const rawCommandFiles: string[] = flattenDeep(await walk('./dist/commands/'));
        const commandFiles: string[] = rawCommandFiles.filter((file: string) => file.split('.')[2] !== 'map');

        console.info(`[init] [load] Loading ${commandFiles.length} commands.`);

        for (const file of commandFiles) {
            if (file.split('.')[1] !== 'js') return;

            const { default: command } = require(`../../${file}`); // The `..` is needed.

            this.commands.set(command.name, command);
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
}
//#endregion