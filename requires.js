module.exports = {
    discord: require('discord.js'),
    lodash: require('lodash'),
    guildIndex: new(require('enmap'))({ provider: new(require('enmap-level'))({ name: 'guildIndex' }) })

}