import { Client } from '../structures/Client';
import { Command, KlasaMessage, Timestamp } from 'klasa';
import { MessageEmbed, GuildMember, Guild } from 'discord.js';


const statuses = {
    online: '<:online:313956277808005120> Online',
    idle: '<:away:313956277220802560> Idle',
    dnd: '<:dnd:313956276893646850> Do Not Disturb',
    offline: '<:offline:313956277237710868> Offline'
};

const timestamp = new Timestamp('d MMMM YYYY');

type Target = GuildMember | Guild;


export default (client: Client) => {

    @client.RegisterPiece({
        type: 'commands',
        name: 'fetch',
        usage: '[targetMember:member|targetGuild:guild]'
    })
    class Fetch extends Command {
        
        async run(message: KlasaMessage, [target]: [Target]) {

            let embed: MessageEmbed | null = null;

            if (target instanceof GuildMember) embed = this.member(target);
            if (target instanceof Guild) embed = this.guild(target);
    
            return embed ? message.sendEmbed(embed) : message.send('Target not found');
        }

        member(target: GuildMember) {
            return new MessageEmbed()
            .setColor(target.displayHexColor || 0xFFFFFF)
            .setThumbnail(target.user.displayAvatarURL())
            .addField('❯ Name', target.user.tag, true)
            .addField('❯ ID', target.id, true)
            .addField('❯ Discord Join Date', timestamp.display(target.user.createdAt), true)
            .addField('❯ Server Join Date', timestamp.display(target.joinedTimestamp), true)
            .addField('❯ Status', statuses[target.presence.status], true)
            .addField('❯ Playing', target.presence.activity ? target.presence.activity.name : 'N/A', true)
            .addField('❯ Highest Role', target.roles.size > 1 ? target.roles.highest.name : 'None', true)
            .addField('❯ Hoist Role', target.roles.hoist ? target.roles.hoist.name : 'None', true);
        }

        guild(target: Guild) {
            return new MessageEmbed()
            .setColor(0xFFFFFF)
            .setThumbnail(target.iconURL())
            .addField('❯ Name', target.name, true)
            .addField('❯ ID', target.id, true)
            .addField('❯ Server Created Date', timestamp.display(target.createdTimestamp), true);
        }
    }
};
