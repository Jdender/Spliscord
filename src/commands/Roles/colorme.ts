import { applyOptions } from '../../util/applyOptions';
import { Command, KlasaMessage, CommandOptions } from 'klasa';

@applyOptions({
    name: 'colorme',
    description: '',
    usage: '<Color:color>',
    requiredPermissions: ['MANAGE_ROLES'],
} as CommandOptions)
export default class extends Command {

    async run(message: KlasaMessage, [color]: [string]) {
        
        // Self explainitory
        if (!message.guildConfigs.get('allowColorme'))
            return message.send('The guild admins disabled or never enabled the `allowColorme` config option.');

        const roles = await this.getRoles(message, color);

        // Set the members roles to the array made earlyer
        message.member.roles.set(roles, 'Set color roles');

        return message.send(`Swoosh! You're now painted \`${color}\`.`);
    }

    // Get the roles of the member with the color role included
    async getRoles(message: KlasaMessage, color: string) {

        // See if there is a color role with the same color
        const existing = message.guild.roles.find(role => role.name === `§${color}`);
        const roles = this.getInitRoles(message);

        // If existing push it to roles and return
        if (existing) return [...roles, existing ];

        // If not create one and push-return
        return [...roles, await this.createRole(message, color) ];
    }

    // The roles the member allredy has, filtering out any existing color roles
    getInitRoles(message: KlasaMessage) {

        return message.member.roles
        .array().filter(role => !role.name.startsWith('§#'));
    }

    // Creates a role with color and name
    createRole(message: KlasaMessage, color: string) {

        return message.guild.roles.create({
            data: {
                name: `§${color}`,
                color,
                mentionable: false,
                hoist: false,
            },
            reason: 'Create color role',
        });
    }

    async init() {

        const { schema } = this.client.gateways.guilds;

        if (!schema) return;

        // Add allowColorme key if not existing
        if (!schema.has('allowColorme'))
            await schema.add('allowColorme', { type: 'boolean' });
    }

}
