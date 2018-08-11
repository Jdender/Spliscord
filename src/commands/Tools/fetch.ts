import { applyOptions } from '../../util/applyOptions';
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

const perms = {
    ADMINISTRATOR: 'Administrator',
    VIEW_AUDIT_LOG: 'View Audit Log',
    MANAGE_GUILD: 'Manage Server',
    MANAGE_ROLES: 'Manage Roles',
    MANAGE_CHANNELS: 'Manage Channels',
    KICK_MEMBERS: 'Kick Members',
    BAN_MEMBERS: 'Ban Members',
    CREATE_INSTANT_INVITE: 'Create Instant Invite',
    CHANGE_NICKNAME: 'Change Nickname',
    MANAGE_NICKNAMES: 'Manage Nicknames',
    MANAGE_EMOJIS: 'Manage Emojis',
    MANAGE_WEBHOOKS: 'Manage Webhooks',
    VIEW_CHANNEL: 'Read Text Channels and See Voice Channels',
    SEND_MESSAGES: 'Send Messages',
    SEND_TTS_MESSAGES: 'Send TTS Messages',
    MANAGE_MESSAGES: 'Manage Messages',
    EMBED_LINKS: 'Embed Links',
    ATTACH_FILES: 'Attach Files',
    READ_MESSAGE_HISTORY: 'Read Message History',
    MENTION_EVERYONE: 'Mention Everyone',
    USE_EXTERNAL_EMOJIS: 'Use External Emojis',
    ADD_REACTIONS: 'Add Reactions',
    CONNECT: 'Connect',
    SPEAK: 'Speak',
    MUTE_MEMBERS: 'Mute Members',
    DEAFEN_MEMBERS: 'Deafen Members',
    MOVE_MEMBERS: 'Move Members',
    USE_VAD: 'Use Voice Activity',
};

const timestamp = new Timestamp('d MMMM YYYY');

type Target = GuildMember | KlasaGuild | KlasaUser | Role;


@applyOptions({
    name: 'fetch',
    description: 'Fetch various types of "discord entitys" using a id or mention.',
    usage: '[TargetMember:member|TargetGuild:guild|TargetUser:user|TargetRole:role]',
    permissionLevel: 8,
})
export default class extends Command {
    
    async run(message: KlasaMessage, [target]: [Target]) {

        // Detect what type of target
        const embed = 
        target instanceof GuildMember ? this.member(target)
        : target instanceof KlasaGuild ? this.guild(target)
        : target instanceof KlasaUser ? this.user(target)
        : target instanceof Role ? this.role(target)
        : null;

        // See if a target was found
        return embed
        ? message.sendEmbed(embed)
        : message.send('No fetchable target found.');
    }

    private member = (target: GuildMember) =>
        new MessageEmbed()
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

    private guild = (target: KlasaGuild) =>
        new MessageEmbed()
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

    private user = (target: KlasaUser) =>
        new MessageEmbed()
        .setColor(0xFFFFFF)
        .setThumbnail(target.displayAvatarURL())
        .addField('❯ Name', target.tag, true)
        .addField('❯ ID', target.id, true)
        .addField('❯ Discord Join Date', timestamp.display(target.createdAt), true)
        .addField('❯ Status', statuses[target.presence.status], true)
        .addField('❯ Playing', target.presence.activity ? target.presence.activity.name : 'N/A', true);

    private role = (target: Role) => 
        new MessageEmbed()
		.setColor(target.hexColor || 0xFFFFFF)
		.addField('❯ Name', target.name, true)
		.addField('❯ ID', target.id, true)
		.addField('❯ Color', target.hexColor || 'None', true)
		.addField('❯ Creation Date', timestamp.display(target.createdAt), true)
		.addField('❯ Hoisted', target.hoist ? 'Yes' : 'No', true)
		.addField('❯ Mentionable', target.mentionable ? 'Yes' : 'No', true)
        .addField('❯ Permissions', 
            Object
            .entries(target.permissions.serialize())
            .filter(perm => perm[1])
            .map(([perm]) => (perms as any)[perm])
            .join(', '),
        );
}
