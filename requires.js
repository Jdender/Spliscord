//#region Require modules
const requires = {
    config: require('./config.json'),
    discord: require('discord.js'),
    lodash: require('lodash'),
    fs: require('fs'),
    nodeutil: require('util'),
    Enmap: require('enmap'),
    EnmapLevel: require('enmap-level'),
}
//#endregion

//#region Patch or construct modules
requires.fs.readdir = requires.nodeutil.promisify(requires.fs.readdir);

const provider = new requires.EnmapLevel({ name: 'guildIndex' })
requires.guildIndex = new requires.Enmap({ provider });
//#endregion

// Any modules not needed
const prune = ['Enmap', 'EnmapLevel'];

module.exports = requires.lodash.omit(requires, prune);