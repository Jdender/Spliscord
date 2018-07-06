import { applyOptions } from '../../../util/applyOptions';
import { Command, KlasaMessage } from 'klasa';
import { MessageAttachment, User } from 'discord.js';

@applyOptions({
    name: 'avatar',
    description: 'Get a users avatar (profile image).',
    usage: '[User:user]',
    aliases: ['pfp'],
})
export default class extends Command {

    async run(message: KlasaMessage, [user]: User[]) {

        const avatar = (user || message.author).avatarURL();

        if (!avatar) return message.send('I can\'t seem to fetch that user\'s avatar.')

        const file = new MessageAttachment(avatar, `avatar${avatar.slice(avatar.lastIndexOf('.'), avatar.length)}`);

        return message.send(file);
    }
}