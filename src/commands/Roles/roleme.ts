import { applyOptions } from '../../util/applyOptions';
import { Command, KlasaMessage, CommandOptions } from 'klasa';
import { Role } from 'discord.js';

@applyOptions({
    name: 'roleme',
    description: '',
    usage: '<add|take|list> (Role:publicRole)',
    usageDelim: ' ',
    requiredPermissions: ['MANAGE_ROLES'],
    subcommands: true,
} as CommandOptions)
export default class extends Command {

    // Add a member to a public role
    async add(message: KlasaMessage, [role]: [Role]) {

        // Add role to member, send a message if we can't
        const result = await message.member.roles.add(role)
        .catch(() => message.send('I don\'t have permisson to do that.'));

        // If the catch block ran return
        if (result instanceof KlasaMessage) return;

        // Send scusses message
        return message.send(`Added you to: ${role.name}`);
    }

    // Same as add but taking
    async take(message: KlasaMessage, [role]: [Role]) {

        const result = await message.member.roles.remove(role)
        .catch(() => message.send('I don\'t have permisson to do that.'));

        if (result instanceof KlasaMessage) return;

        return message.send(`Removed you from: ${role.name}`);
    }

    // List all public roles in the guild
    async list(message: KlasaMessage) {

        // Get the names of all the guild's public roles
        const publicRoles = this
        .getPublicRoles(message)
        .map(role => role.name);

        // If the guild has none
        if (!publicRoles[0])
            return message.send('This guild has no public roles to list.');
            
        // Send list
        return message.send(publicRoles.join(', '));
    }

    // Get public role ids from config and map them to roles
    private getPublicRoles = (message: KlasaMessage): Role[] =>

        message.guildConfigs
        .get('publicRoles')
        .map((id: string) => message.guild.roles.get(id));
    

    // Find a role that matched the provided name
    private findPublicRole = (message: KlasaMessage, name: string) => 

        this
        .getPublicRoles(message)
        .find(role => role.name === name);
    

    // Custom 'publicrole' arg type
    private publicRoleResolver = async (arg: string, _: any, message: KlasaMessage, [action]: string[]) => {

        // If we are listing we don't need the role name
        if (action === 'list') return '';

        if (!arg)
            throw 'You need to provide a role.';

        const publicRole = this.findPublicRole(message, arg);

        if (!publicRole)
            throw 'That public role was not found.'

        return publicRole;
    }

    async init() {

        // Register arg type
        this.createCustomResolver('publicrole', this.publicRoleResolver);

        const { schema } = this.client.gateways.guilds;

        if (!schema) return;

        // Add publicRoles key if not existing
        if (!schema.has('publicRoles'))
            await schema.add('publicRoles', { type: 'role', array: true });
    }

}
