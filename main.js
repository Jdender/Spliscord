if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node.');


void async function Main() {

    //#region Set up client and requires.
    const client = new(require('discord.js')).Client();
    require('lodash').assign(client, require('./requires'));
    //#endregion

}();