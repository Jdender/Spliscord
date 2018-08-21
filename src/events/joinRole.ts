import { applyOptions } from '../util/applyOptions';
import { Event } from 'klasa';
import { GuildMember, Role } from 'discord.js';

@applyOptions({
    name: 'joinRole',
    event: 'guildMemberAdd',
})
export default class extends Event {

    run(member: GuildMember) {

        if (!member.guild.me.hasPermission('MANAGE_ROLES')) return;
        
        const ids = this.client.gateways.guilds.get(member.guild.id).get('joinRoles') as string[];

        const roles = ids
        .map(id => member.guild.roles.get(id))
        .filter(r => !!r && r.editable) as Role[];
        
        if (!roles.length) return;

        member.roles.add(roles, 'Join role');
    }

    async init() {

        const { schema } = this.client.gateways.guilds;

        if (!schema) return;

        if (!schema.has('joinRoles'))
            await schema.add('joinRoles', { 
                type: 'role',
                array: true,
            });
    }
}
