import { Client } from 'discord.js';
import { clean } from '../utill';

export default (client: Client) => {

    client.registry.addCommand({
        name: 'dev.eval.js',
        description: 'Run some JavaScript in the bot\'s context.',
        aliases: [],
        usage: '<...code>',
        cooldown: 0,
        permissions: 5,
        args: null,
    });

    client.registry.on('dev.eval.js', async ({message, prefix, ...order}) => {
        try {
            const args = message.channel.type === 'text'
            ? message.content.slice(prefix.length).split(/\s+/g)
            : message.content.split(/\s+/g);

            args.splice(0, 3);
            const code = args.join(' ');
            const evaled = eval(code);

            message.channel.send(await clean(evaled), { code: 'js' });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${await clean(err)}\n\`\`\``);
        }
    });

};