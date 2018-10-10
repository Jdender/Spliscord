import { applyOptions } from '../../util/applyOptions';
import { Command, KlasaMessage, CommandOptions } from 'klasa';
import { GuildMember } from 'discord.js';

@applyOptions<CommandOptions>({
    name: 'colorme',
    description: 'Color your self with any color you want. Requires `allowColorme` to enabled in guild config.',
    usage: '<Color:color>',
    requiredPermissions: ['MANAGE_ROLES'],
    aliases: ['colourme'],
})

// I use names to determine color roles, it's easier than storing a array in db
// A color role is any role that matches the guild's colormeRoleName

export default class extends Command {

    async run(message: KlasaMessage, [colorStr]: [string]) {
        
        if (!message.guild.settings.get('allowColorme'))
            return message.send('The guild admins disabled or never enabled the `allowColorme` config option.');

        // Discord.js can't do more than one role action quickly
        // So insted of adding/removing roles, we add/remove to an array
        // Then set the members roles to said array, therefor only doing one role action

        const name: string = message.guild.settings.get('colormeRoleName');

        const color = parseInt(colorStr, 16);

        // Compute the new roles in an array
        return this.getNewRoles(message, color, name)

        .then(roles => message.member.roles.set(roles, 'Set color roles'))

        .then(this.removeExtra(color, name))

        .then(() => message.send(`Swoosh! You're now painted \`#${colorStr}\`.`))
        
        .catch(() => message.send('Sorry, I was unable to paint you.'));
    }

    // Get the roles of the member with the color role included
    private getNewRoles = async (message: KlasaMessage, color: number, name: string) =>

        [
            ...this.getMemberNonColorRoles(message),
            this.findExistingColorRole(message, color, name) || await this.createColorRole(message, color, name),
        ];
    

    // Try to find a color role with the same color
    private findExistingColorRole = (message: KlasaMessage, color: number, name: string) => 

        message.guild.roles
        .find(role => role.name === name && role.color === color);
    

    // The roles the member allredy has, filtering out any existing color roles
    private getMemberNonColorRoles = (message: KlasaMessage) => 

        message.member.roles
        .filter(role => role.name !== message.guild.settings.get('colormeRoleName'))
        .array();
    
    
    // Creates a role with color and name
    private createColorRole = (message: KlasaMessage, color: number, name: string) =>

        message.guild.roles.create({
            data: {
                name,
                color,
                mentionable: false,
                hoist: false,
                position: (this.getRoleAnchor(message) || {} as any).position,
            },
            reason: 'Create color role',
        });

    private getRoleAnchor = ({ guild }: KlasaMessage) =>

        guild.roles.get(
            guild.settings.get('colormeRoleAnchor')
        );
        

    // Remove any unused color roles in guild
    private removeExtra = (color: number, name: string) => (member: GuildMember) =>

        member.guild.roles // Guild roles
        .filter(role => role.name === name) // Filter for color roles
        .filter(role => role.color !== color) // Filter out just created
        .filter(role => role.members.size === 0) // Filter for empty roles
        .map(role => role.delete('Unused color role')); // Delete roles
    

    async init() {

        const { schema } = this.client.gateways.guilds;

        if (!schema) return;

        if (!schema.has('allowColorme'))
            await schema.add('allowColorme', { type: 'boolean' });

        if (!schema.has('colormeRoleAnchor'))
            await schema.add('colormeRoleAnchor', { type: 'role' });

        if (!schema.has('colormeRoleName'))
            await schema.add('colormeRoleName', { 
                type: 'string',
                default: 'Color',
            });
    }

}
