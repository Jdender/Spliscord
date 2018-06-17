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
        
        if (!message.guild.configs.get('allowColorme'))
            return message.send('The guild admins disabled or never enabled the `allowColorme` config option.');

        const roles = await this.getRoles(message, color);

        message.member.roles.set(roles, 'Set color roles');

        return message.send(`Swoosh! You're now painted \`${color}\`.`);
    }

    async getRoles(message: KlasaMessage, color: string) {

        const roles = this.getInitRoles(message);
        const existing = message.guild.roles.find(role => role.name === `§${color}`);

        if (existing) return [...roles, existing ];

        return [...roles, await this.createRole(message, color) ];
    }

    getInitRoles(message: KlasaMessage) {

        return message.member.roles
        .array().filter(role => !role.name.startsWith('§#'));
    }

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

        if (!schema.has('allowColorme'))
            await schema.add('allowColorme', { type: 'boolean' });
    }

}
