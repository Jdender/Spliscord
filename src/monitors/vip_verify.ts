import { applyOptions } from '../util/applyOptions';
import { Monitor, KlasaMessage } from 'klasa';

interface VerifyConfig {
    channel: string;
    beforeRole: string;
    afterRole: string;
    verifyMessage: RegExp;
}

interface VerifySpec {
    [guild:string]: VerifyConfig;
}

const vipVerifyConfig: VerifySpec = {

    // MBN
    '339586884772823043': {
        channel: '427303825171415050', // #verify 
        beforeRole: '425092490916397067', // 
        afterRole: '415221406452809728', // 
        verifyMessage: /i confirm that i am over 18 years old/i,
    },

    // Chateau de Diamondo
    '464862037642575873': {
        channel: '464933691051868192', // #corner-office 
        beforeRole: '464871152561422345', // Villagers
        afterRole: '464891277373079565', // Ranked Samurai
        verifyMessage: /i pledge allegiance to the shogun/i,
    },
}

@applyOptions({
    name: 'vip_verify',
    ignoreOthers: false,
})
export default class extends Monitor {

    async run(message: KlasaMessage) {

        const config = vipVerifyConfig[message.guild.id];

        // If not a vip verify server
        if (!config) return;

        // If not right channel
        if (message.channel.id !== config.channel) return;

        // If message doesn't match regex
        if (!message.content.match(config.verifyMessage)) return;

        // If they don't have before and have after role
        if (!message.member.roles.has(config.beforeRole) && message.member.roles.has(config.afterRole))
            return message.channel.send('You\'re already verified!');

        const roles = [
            ...message.member.roles
            .filter(role => role.id !== config.beforeRole)
            .array(),

            message.guild.roles.get(config.afterRole)!,
        ];

        // Set roles
        await message.member.roles.set(roles, 'Verify');

        message.reply('Welcome, you\'re verified!');
    }
}
