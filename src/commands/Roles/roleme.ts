import { applyOptions } from '../../util/applyOptions';
import { Command, KlasaMessage, CommandOptions } from 'klasa';
import { Role } from 'discord.js';

@applyOptions({
    name: 'roleme',
    description: 'Work in progress',
    usage: '<add|take|list> (Role:publicRole)',
    usageDelim: ' ',
    requiredPermissions: ['MANAGE_ROLES'],
    subcommands: true,
} as CommandOptions)

/*
This also has a quirky way to store things.

SettingsGateway can't store real key-value pairs
so each guild config has two arrays, 'publicRoleIds' and 'publicRoleNames'.
The way the names and role ids are bound together is array index
e.g. names[2] is the name for the role ids[2].

You can't edit thease arrays using the normal conf command;
you have to use the roleme conf to keep it in sync.
*/

export default class extends Command {

    // Add a member to a public role
    add = (message: KlasaMessage, [role]: [Role]) => 

        // Add role to member, send a message if we can't
        message.member.roles.add(role)
        .then(() => message.send(`Added you to: ${role.name}`))
        .catch(() => message.send('I don\'t have permisson to do that.'));
    

    // Same as add but taking
    take = (message: KlasaMessage, [role]: [Role]) =>

        message.member.roles.remove(role)
        .then(() => message.send(`Removed you from: ${role.name}`))
        .catch(() => message.send('I don\'t have permisson to do that.'));
    

    // List all public roles in the guild
    list = (message: KlasaMessage) => {

        // Get the names of all the guild's public roles
        const roleNames = message.guildConfigs.get('publicRoleNames') as string[];

        return message.send(

            // Cast to boolean, if length is zero it will be false
            !!roleNames.length
            ? roleNames.join(', ') // Send list
            : 'This guild has no public roles to list.' // If the guild has none     
        );
    }

    // Custom 'publicrole' arg type
    private publicRoleResolver = async (arg: string, _: any, message: KlasaMessage, [action]: string[]) => {

        // If we are listing we don't need the role name
        if (action === 'list') return 0;

        if (!arg) throw 'You need to provide a role.';

        const roleNames = message.guildConfigs.get('publicRoleNames') as string[];

        const roleIndex = roleNames.indexOf(arg);

        if (roleIndex  === -1)
            throw 'That public role was not found.';

        const roleIds = message.guildConfigs.get('publicRoleIds') as string[];

        const role = message.guild.roles.get(roleIds[roleIndex]);

        if (!role || roleNames.length !== roleIds.length) {

            this.client.emit('error', new Error('Roleme desync'));

            throw 'Somehow this guild\'s public role storage has gotten out of sync.' +
                'This is not supposed to normaly happen, as we have guards against it.' +
                'A error has been sent to my server, please wait while the devs look into this.';
        }

        return role;
    }

    async init() {

        // Register arg type
        this.createCustomResolver('publicrole', this.publicRoleResolver);

        const { schema } = this.client.gateways.guilds;

        if (!schema) return;

        // Add publicRoles key if not existing
        if (!schema.has('publicRoleIds'))
            await schema.add('publicRoleIds', { type: 'role', array: true, configurable: false });

        if (!schema.has('publicRoleNames'))
            await schema.add('publicRoleNames', { type: 'string', array: true, configurable: false });
    }

}
