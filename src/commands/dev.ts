import { Client } from 'discord.js';
import { clean } from '../core/util';

export default (client: Client) => {

    client.registry.addCommand({
        name: 'dev.eval',
        description: 'Run some JavaScript in the bot\'s context.',
        aliases: [],
        usage: '<...code>',
        cooldown: 0,
        permissions: 5,
        args: null,
    });

    client.registry.on('dev.eval', async ({message, prefix, ...order}) => {
        try {
            const args = message.channel.type === 'text'
            ? message.content.slice(prefix.length).split(/\s+/g)
            : message.content.split(/\s+/g);

            args.splice(0, 2);
            const code = args.join(' ');
            const evaled = eval(code);

            message.channel.send(await clean(evaled), { code: 'js' });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${await clean(err)}\n\`\`\``);
        }
    });

};
