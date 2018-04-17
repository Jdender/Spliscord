import { Client } from 'discord.js';

export default (client: Client) => {

    client.registry.addCommand({
        name: 'guild.prefix',
        description: 'Set the guild\'s prefix to call the bot.',
        aliases: ['this.prefix'],
        usage: '[prefix]',
        cooldown: 3,
        permissions: 2,
        args: null,
        checks: {
            guildOnly: true,
        },
    });

    client.registry.on('guild.prefix', async ({message, args}) => {

        await client.guildConf.updateById(message.guild.id, { prefix: args._[0] });

        if (!args._[0])
            await
            message.channel.send('Okay, I removed the guild\'s prefix. You can still use a guild prefix or a ping.');
        else
            await message.channel.send(`Okay, I set the guild\'s prefix to \`${args._[0]}\`.`);
    });
};
