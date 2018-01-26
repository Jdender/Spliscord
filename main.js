if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node.');

void async function() {
    const client = new (require('discord.js')).client();
    console.log(client)
}();