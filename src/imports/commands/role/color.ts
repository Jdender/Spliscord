import { Client, TextChannel } from 'discord.js';
import tinycolor = require('tinycolor2');

export default (client: Client) => {

    client.registry.addCommand({
        name: 'role.colorme',
        description: 'wew',
        aliases: ['colorme'],
        usage: '[Color name | Hex color | Rgb color | Any tinycolor format]',
        cooldown: 3,
        permissions: 0,
        args: null,
    });

    client.registry.on('role.colorme', async ({message, args, guildConf}) => {

        //#region Checks
        if (guildConf === 'DM')
            return message.channel.send('That command can only be used in a guild, not DMs.');

        if (!guildConf.allowRoleColorme)
            return message.channel.send('The guild admins disabled or never enabled the `allowRoleColorme` flag.');

        const permissions = (message.channel as TextChannel).permissionsFor(message.guild.me);

        if (!permissions.has('MANAGE_ROLES_OR_PERMISSIONS'))
            return message.channel.send('I don\'t have permission to manage roles.');
        //#endregion

        const color = tinycolor(args._[0]);

        if (!color.isValid())
            return message.channel.send('Tinycolor was unable to recognize that color.');

        const hex = color.toHexString();

        const roles = message.member.roles
        .array().filter(role => !role.name.startsWith('§#'));

        const existing = message.guild.roles.find('name', `§${hex}`);

        if (existing)
            roles.push(existing);

        else
            roles.push(
            await message.guild.createRole({
                name: `§${hex}`,
                color: hex,
                mentionable: false,
                hoist: false,
            }, '[role.colorme] Create color role.'));

        message.member.setRoles(roles);

        message.channel.send(`Swoosh! You're now painted \`${hex}\`.`);
    });
};
