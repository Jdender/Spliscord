import { Client } from 'discord.js';

// Requested by MBN(339586884772823043)<Guild>

export default (client: Client) =>
    client.on('message', message => {

        if (message.channel.id !== '427303825171415050') return;
        if (!message.content.match(/i confirm that i am over 18 years old\.?/i)) return;

        if (!message.member.roles.has('425092490916397067'))
            return message.channel.send('You\'re already verified!');

        message.member.removeRole(message.guild.roles.get('425092490916397067')!);
        message.member.addRole(message.guild.roles.get('415221406452809728')!);

        message.reply('Welcome, you\'re verified!');
    });
