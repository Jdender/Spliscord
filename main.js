if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node.');

//#region Set up client and requires.
const client = new(require('discord.js')).Client();
Object.assign(client, require('./requires'));
//#endregion

void async function Main() {

    //#region Set Constants
    client.once('ready', () => client.prefixMention = new RegExp(`^<@!?${client.user.id}> `));
    //#endregion

    //#region Make Collections
    client.commands = new client.discord.Collection();
    //#endregion

    //#region Simple Events
    client.on('error', (e) => console.error(e));
    client.on('warn', (w) => console.warn(w));
    client.on('debug', (d) => console.info(d));
    process.on('unhandledRejection', (e) => console.error(`Uncaught Promise Rejection:\n${e}`));
    //#endregion

    //#region Command Importer
    const commandFiles = await client.fs.readdir('./commands/');
    console.info(`[load] Loading ${commandFiles.length} commands.`);

    for (const file of commandFiles) {
        if (file.split('.')[1] !== 'js') return;

        const command = require(`./commands/${file}`);

        client.commands.set(command.name, command);

        delete require.cache[require.resolve(`./commands/${file}`)];
    }
    //#endregion

    //#region Event Importer
    const eventFiles = await client.fs.readdir('./events/');
    console.info(`[load] Loading ${eventFiles.length} events.`);
    
    for (const file of eventFiles) {
        if (file.split('.')[1] !== 'js') return;

        const event = require(`./events/${file}`);

        client.on(event.name, (...args) => event.execute(client, ...args));

        delete require.cache[require.resolve(`./events/${file}`)];
    }
    //#endregion

    client.login(require(client.config.token.path)[client.config.token.name]);
}();