//#region Require modules
const requires = {
    config: require('./config.json'),
    discord: require('discord.js'),
    lodash: require('lodash'),
    fs: require('fs'),
    nodeutil: require('util'),
    path: require('path'),
    low: require('lowdb'),
    LowDbFileSync: require('lowdb/adapters/FileSync'),
}
//#endregion

//#region Patch or construct modules
requires.fs.readdir = requires.nodeutil.promisify(requires.fs.readdir);
requires.fs.stat = requires.nodeutil.promisify(requires.fs.stat);
//#endregion

//#region Util Functions
const walk = async d => (await requires.fs.stat(d)).isDirectory() ? await Promise.all((await requires.fs.readdir(d)).map(async f => await walk(requires.path.join(d, f)))) : d;

Object.assign(requires, {
    walk
});
//#endregion

// Any modules not needed
const prune = [];

module.exports = requires.lodash.omit(requires, prune);