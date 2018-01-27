module.exports = {
    name: 'ready',
    execute(client) {
        console.info(`[info] Runing in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
    },
};