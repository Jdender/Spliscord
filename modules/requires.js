//#region Require modules
const requires = {
    config: require('../config.json'),
    discord: require('discord.js'),
    lodash: require('lodash'),
    fs: require('fs'),
    nodeutil: require('util'),
    path: require('path'),
    low: require('lowdb'),
    LowDbFileSync: require('lowdb/adapters/FileSync'),
    functions: require('./functions.js'),
}
//#endregion

//#region Patch or construct modules
requires.fs.readdir = requires.nodeutil.promisify(requires.fs.readdir);
requires.fs.stat = requires.nodeutil.promisify(requires.fs.stat);
//#endregion

// Any modules not needed
const prune = [];
console.log(typeof requires)
module.exports = requires.lodash.omit(requires, prune);