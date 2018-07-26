import { applyOptions } from '../../../util/applyOptions';
import { Command, KlasaMessage, Timestamp, KlasaUser, KlasaGuild } from 'klasa';
import { MessageEmbed, GuildMember, Role } from 'discord.js';


const statuses = {
    online: '<:online:313956277808005120> Online',
    idle: '<:away:313956277220802560> Idle',
    dnd: '<:dnd:313956276893646850> Do Not Disturb',
    offline: '<:offline:313956277237710868> Offline',
};

const verificationLevels = [
    'None',
    'Low',
    'Medium',
    '(╯°□°）╯︵ ┻━┻',
    '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻',
];

const filterLevels = [
    'Off',
    'No Role',
    'Everyone',
];

const timestamp = new Timestamp('d MMMM YYYY');

type Target = GuildMember | KlasaGuild;


@applyOptions({
    name: 'fetch',
    description: 'Fetch various types of "discord entitys" using a id or mention.',
    usage: '[TargetMember:member|TargetGuild:guild|TargetUser:user]',
    permissionLevel: 8,
})
export default class extends Command {
    
    async run(message: KlasaMessage, [target]: [Target]) {

        let embed: MessageEmbed | null = null;

        // Detect what type of target
        if (target instanceof GuildMember) embed = this.member(target);
        if (target instanceof KlasaGuild) embed = this.guild(target);
        if (target instanceof KlasaUser) embed = this.user(target);

        // See if a target was found
        return embed ? 
        message.sendEmbed(embed) : 
        message.send('No fetchable target found.');
    }

    // Fetch info for members
    private member(target: GuildMember) {
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

    // Fetch info for guilds
    private guild(target: KlasaGuild) {
        return new MessageEmbed()
        .setColor(0xFFFFFF)
        .setThumbnail(target.iconURL())
        .addField('❯ Name', target.name, true)
        .addField('❯ ID', target.id, true)
        .addField('❯ Creation Date', timestamp.display(target.createdAt), true)
        .addField('❯ Region', target.region, true)
        .addField('❯ Explicit Filter', filterLevels[target.explicitContentFilter], true)
        .addField('❯ Verification Level', verificationLevels[target.verificationLevel], true)
        .addField('❯ Owner', target.owner ? target.owner.user.tag : 'None', true)
        .addField('❯ Members', target.memberCount, true);
    }

    private user(target: KlasaUser) {
        return new MessageEmbed()
        .setColor(0xFFFFFF)
        .setThumbnail(target.displayAvatarURL())
        .addField('❯ Name', target.tag, true)
        .addField('❯ ID', target.id, true)
        .addField('❯ Discord Join Date', timestamp.display(target.createdAt), true)
        .addField('❯ Status', statuses[target.presence.status], true)
        .addField('❯ Playing', target.presence.activity ? target.presence.activity.name : 'N/A', true);
    }
}
