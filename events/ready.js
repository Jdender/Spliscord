module.exports = {
    name: 'ready',
    execute(client) {
        console.info(`[info] Runing in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);

        //#region Set Constants
        client.prefixMention = new RegExp(`^<@!?${client.user.id}> `);
        client.inviteLink = `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot`;
        //#endregion
    },
};