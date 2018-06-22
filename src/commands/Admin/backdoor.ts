import { applyOptions } from '../../util/applyOptions';
import { KlasaMessage, Command, KlasaGuild } from 'klasa';
import { GuildChannel } from 'discord.js';

@applyOptions({
    name: 'backdoor',
    description: 'Create a invite link to backdoor any server the bot is in.',
    usage: '<Guild:guild>',
    permissionLevel: 9,
})
export default class extends Command {

    async run(message: KlasaMessage, [guild]: [KlasaGuild]) {

        // Create a invite from the resolved channel
        // If it errors the catch block returns null
        const { code } = 
        await this.createInvite(this.resolveChannel(guild))
        .catch(() => ({ code: null }));

        if (!code) return message.send('Unable to create invite link.');

        return message.send(`Created backdoor invite: https://discord.gg/${code}`);
    }

    // Create a invite
    private createInvite(channel: GuildChannel) {

        return channel.createInvite({
            temporary: false,
            maxAge: 100,
            maxUses: 1,
        });
    }

    // Find a channel that the bot can make a invite in
    private resolveChannel(guild: KlasaGuild) {

        return guild.channels.find(
            chan =>
            chan.type === 'text' &&
            chan.permissionsFor(this.client.user).has(['VIEW_CHANNEL', 'CREATE_INSTANT_INVITE'])
        );
    }
}
