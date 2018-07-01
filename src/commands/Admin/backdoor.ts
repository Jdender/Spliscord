import { applyOptions } from '../../util/applyOptions';
import { KlasaMessage, Command, KlasaGuild } from 'klasa';
import { GuildChannel } from 'discord.js';
import { Maybe } from '../../functional/Maybe';

@applyOptions({
    name: 'backdoor',
    description: 'Create a invite link to backdoor any server the bot is in.',
    usage: '<Guild:guild>',
    permissionLevel: 9,
})
export default class extends Command {

    async run(message: KlasaMessage, [guild]: [KlasaGuild]) {
        // Use magic of Maybe
        return Maybe(guild)
        .map(this.resolveChannel)
        .map(this.createInvite)
        .map(_ => 
            _.then(({ code }) => `Created backdoor invite: https://discord.gg/${code}`)
        )
        .orElse(Promise.resolve('Unable to create invite link.'))
        .map(_ => 
            _.then(text => message.send(text))
        )
        .flatten() || null;
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
    private resolveChannel = (guild: KlasaGuild) => {

        return guild.channels.find(
            chan => chan.type === 'text' &&
            chan.permissionsFor(this.client.user).has(['VIEW_CHANNEL', 'CREATE_INSTANT_INVITE'])
        );
    }
}
