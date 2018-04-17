import { Client } from 'discord.js';
import tinycolor = require('tinycolor2');

export default (client: Client) => {

    client.registry.addCommand({
        name: 'role.color',
        description: 'Give your self a role with the specified color.',
        aliases: ['colorme'],
        usage: '<Color name | Hex color | Rgb color | Any tinycolor vaule>',
        cooldown: 3,
        permissions: 0,
        args: null,
        checks: {
            guildOnly: true,
        },
    });

    client.registry.on('role.color', async ({message, args}) => {

        const color = tinycolor(args._[0]);

        if (!color.isValid())
            return await message.channel.send('Tinycolor was unable to recognize that color.');

        const hex = color.toHexString();

        message.member.roles
        .filter(role => role.name.startsWith('§#'))
        .map(role => message.member.removeRole(message.guild.roles.find('name', role.name)));

        const existing = message.guild.roles.find('name', `§${hex}`);

        if (existing)
            await message.member.addRole(existing);

        else {
            const role = await message.guild.createRole({
                name: `§${hex}`,
                color: hex,
                mentionable: false,
            });

            await message.member.addRole(role);
        }
    });
};
