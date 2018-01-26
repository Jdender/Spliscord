if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node.');


void async function Main() {

    //#region Set up client and requires.
    const client = new(require('discord.js')).Client();
    require('lodash').assign(client, require('./requires'));
    //#endregion

    //#region Simple Events
    client.on('error', (e) => console.error(e));
    client.on('warn', (w) => console.warn(w));
    client.on('debug', (d) => console.info(d));
    //#endregion

    //#region Event Handler
    const eventFiles = await client.fs.readdir('./events/');
    console.info(`[load] Loading ${eventFiles.length} events.`);
    eventFiles.forEach((file) => {
        if (file.split('.')[1] !== 'js') return;

        const eventFunction = require(`./events/${file}`);
        const eventName = file.split('.')[0];

        client.on(eventName, (...args) => eventFunction.run(client, ...args));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
    //#endregion

    client.login(require(client.config.token.path)[client.config.token.name]);
}();