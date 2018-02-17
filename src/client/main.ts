//#region Because barrels
import {
    Collection,
    Client,
    BotConfig,
    walk,
    readdirAsync,
    Command,
    flattenDeep,
    logger,
    executeCmd,
    storage,
} from './client.b';
//#endregion

//#region Because typescript
export class Spliscord extends Client {

    public commands: Collection < string, Command > = new Collection();
    public cooldowns: Collection < string, Collection < string, any > > = new Collection();

    public storage = storage;

    public prefixMention: RegExp;
    public inviteLink: string;

    public constructor(public config: BotConfig) {
        super();

        logger(this);

        this.import();

        this.on('message', (message: any) => executeCmd(this, message));

        this.login(require(config.token.path)[config.token.name]);
    }

    public async import(): Promise < void > {

        //#region Command Importer
        const rawCommandFiles: string[] = flattenDeep(await walk('./src/commands/'));
        const commandFiles: string[] = rawCommandFiles.filter((file: string) => file.split('.')[2] !== 'map');

        console.info(`[init] [load] Loading ${commandFiles.length} commands.`);

        for (const file of commandFiles) {
            if (file.split('.')[1] !== 'ts') continue;

            const { default: command } = require(`../../${file}`); // The `..` is needed.

            this.commands.set(command.name, command);
        }
        //#endregion

    }
}
//#endregion