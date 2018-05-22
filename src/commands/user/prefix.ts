import { Client } from 'discord.js';

export default (client: Client) => {

    client.registry.addCommand({
        name: 'user.prefix',
        description: 'Set your user prefix to call the bot.',
        aliases: ['me.prefix'],
        usage: '[prefix]',
        cooldown: 3,
        permissions: 0,
        args: null,
    });

    client.registry.on('user.prefix', async ({message, args}) => {

        await client.userConf.updateById(message.author.id, { prefix: args._[0] });

        if (!args._[0])
            message.channel.send('Okay, I removed your user prefix. You can still use a guild prefix or a ping.');
        else
            message.channel.send(`Okay, I set your user prefix to \`${args._[0]}\`.`);
    });
};
