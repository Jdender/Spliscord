const version = process.version.slice(1).split('.');
if (version[0] < 8 || version[1] < 9) throw new Error('Node 8.9.0 or higher is required. Update Node.');

//#region Set up client and requires.
const client = new(require('discord.js')).Client();
Object.assign(client, require('./modules/requires'));
//#endregion

void async function Main() {

    //#region Set Up Database
    client.db = client.low(new client.LowDbFileSync('db.json'));
    client.db.defaults({
            servers: [],
            users: [],
        })
        .write();
    //#endregion

    //#region Set Up Environment Config
    client.env = client.low(new client.LowDbFileSync('env.json'));
    client.env.defaults({
            comment: 'This file will be removed when the bot moves to the new db. For now it\'s using LowDB so it needs this.',
            stack: [],
        })
        .write();
    //#endregion

    //#region Make Collections
    client.commands = new client.discord.Collection();
    client.cooldowns = new client.discord.Collection();
    //#endregion

    //#region Simple Events
    client.on('error', (e) => console.error(e));
    client.on('warn', (w) => console.warn(w));
    client.on('debug', (d) => console.info(d));
    process.on('unhandledRejection', (e) => console.error(`Uncaught Promise Rejection:\n${e}`));
    //#endregion

    //#region Command Importer
    const commandFiles = client.lodash.flattenDeep(await client.functions.walk('./commands/'));
    console.info(`[load] Loading ${commandFiles.length} commands.`);

    for (const file of commandFiles) {
        if (file.split('.')[1] !== 'js') return;

        const command = require(`./${file}`);

        if (command.initialize) command.initialize(client);

        client.commands.set(command.name, command);

        delete require.cache[require.resolve(`./${file}`)];
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