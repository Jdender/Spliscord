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
    parseArgs: require('minimist'),
    phin: require('phin').promisified,
}
//#endregion

//#region Patch or construct modules
requires.fs.readdir = requires.nodeutil.promisify(requires.fs.readdir);
requires.fs.stat = requires.nodeutil.promisify(requires.fs.stat);
//#endregion

module.exports = requires;