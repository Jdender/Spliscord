import { applyOptions } from '../../util/applyOptions';
import { Command, KlasaMessage } from 'klasa';
import { GuildMember } from 'discord.js';

@applyOptions({
    name: 'colorme',
    description: 'Color your self with any color you want. Requires `allowColorme` to enabled in guild config.',
    usage: '<Color:color>',
    requiredPermissions: ['MANAGE_ROLES'],
})

// I use names to determine color roles, it's easier than storing a array in db
// A color role is any role that starts with "§" and is followed by a hex color
// e.g. "§#123123" is a valid color role name

export default class extends Command {

    async run(message: KlasaMessage, [color]: [string]) {
        
        if (!message.guild.settings.get('allowColorme'))
            return message.send('The guild admins disabled or never enabled the `allowColorme` config option.');

        // Discord.js can't do more than one role action quickly
        // So insted of adding/removing roles, we add/remove to an array
        // Then set the members roles to said array, therefor only doing one role action

        // Compute the new roles in an array
        return this.getNewRoles(message, color)

        .then(roles => message.member.roles.set(roles, 'Set color roles'))

        .then(this.removeExtra(color))

        .then(() => message.send(`Swoosh! You're now painted \`${color}\`.`))
        
        .catch(() => message.send('Sorry, I was unable to paint you.'));
    }

    // Get the roles of the member with the color role included
    private getNewRoles = async (message: KlasaMessage, color: string) =>

        [
            ...this.getMemberNonColorRoles(message),
            this.findExistingColorRole(message, color) || await this.createColorRole(message, color),
        ];
    

    // Try to find a color role with the same color
    private findExistingColorRole = (message: KlasaMessage, color: string) => 

        message.guild.roles
        .find(role => role.name === `§${color}`);
    

    // The roles the member allredy has, filtering out any existing color roles
    private getMemberNonColorRoles = (message: KlasaMessage) => 

        message.member.roles
        .filter(role => !role.name.startsWith('§#'))
        .array();
    

    // Creates a role with color and name
    private createColorRole = (message: KlasaMessage, color: string) =>

        message.guild.roles.create({
            data: {
                name: `§${color}`,
                color,
                mentionable: false,
                hoist: false,
            },
            reason: 'Create color role',
        });


    // Remove any unused color roles in guild
    private removeExtra = (color: string) => (member: GuildMember) =>

        member.guild.roles // Guild roles
        .filter(role => role.name !== `§${color}`) // Filter out just created
        .filter(role => role.name.startsWith('§#')) // Filter for color roles
        .filter(role => role.members.size === 0) // Filter for empty roles
        .map(role => role.delete('Unused color role')); // Delete roles
    

    async init() {

        const { schema } = this.client.gateways.guilds;

        if (!schema) return;

        if (!schema.has('allowColorme'))
            await schema.add('allowColorme', { type: 'boolean' });
    }

}
