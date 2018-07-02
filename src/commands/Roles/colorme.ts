import { applyOptions } from '../../util/applyOptions';
import { Command, KlasaMessage } from 'klasa';
import { GuildMember } from 'discord.js';

@applyOptions({
    name: 'colorme',
    description: '',
    usage: '<Color:color>',
    requiredPermissions: ['MANAGE_ROLES'],
})

// I use names to determine color roles, it's easier than storing a array in db
// A color role is any role that starts with "§" and is followed by a hex color
// e.g. "§#123123" is a valid color role name

export default class extends Command {

    async run(message: KlasaMessage, [color]: [string]) {
        
        // Self explainitory
        if (!message.guildConfigs.get('allowColorme'))
            return message.send('The guild admins disabled or never enabled the `allowColorme` config option.');

        // Discord.js can't do more than one role action quickly
        // So insted of adding/removing roles, we add/remove to an array
        // Then set the members roles to said array, therefor only doing one role action

        // Compute the new roles in an array
        return this.getNewRoles(message, color)

        // Set the member's roles to the array made earlyer
        .then(roles => message.member.roles.set(roles, 'Set color roles'))

        // The .then above this returns a member
        // And removeExtra takes a member
        // So we can just pass it to .then
        .then(this.removeExtra(color))

        // Last but not least
        // Send a message confirming the color
        .then(() => message.send(`Swoosh! You're now painted \`${color}\`.`))
        
        // If any of the above steps threw a error,
        // Send a error message
        .catch(() => message.send('Sorry, I was unable to paint you.'));
    }

    // Get the roles of the member with the color role included
    private getNewRoles = async (message: KlasaMessage, color: string) =>

        // See if there is a color role with the same color
        // If existing make an array with it and all the non color roles
        // If not create one and do the same
        [
            ...this.getMemberNonColorRoles(message),
            // Find *or* create one
            this.findExistingColorRole(message, color) || await this.createColorRole(message, color),
        ];
    

    // Try to find a color role with the same color
    private findExistingColorRole = (message: KlasaMessage, color: string) => 

        message.guild.roles
        .find(role => role.name === `§${color}`); // Find using color role name format
    

    // The roles the member allredy has, filtering out any existing color roles
    private getMemberNonColorRoles = (message: KlasaMessage) => 

        message.member.roles
        .filter(role => !role.name.startsWith('§#')) // Use name to determine color role or not
        .array(); // We want to return a array not a collection
    

    // Creates a role with color and name
    private createColorRole = (message: KlasaMessage, color: string) =>

        message.guild.roles.create({
            data: {
                name: `§${color}`, // Use color role name format
                color,
                mentionable: false,
                hoist: false, // "Display role members separately from online members"
            },
            reason: 'Create color role',
        });


    // This function is curryed using arrows
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

        // Add allowColorme key if not existing
        if (!schema.has('allowColorme'))
            await schema.add('allowColorme', { type: 'boolean' });
    }

}
