import { Client, Message } from 'discord.js';

const ball8list = require('../../resources/8ball.json') as string[];

export default (client: Client) => {

    client.registry.addCommand({
        name: 'fun.8ball',
        description: 'Ask the magic 8ball a question.',
        aliases: ['8ball'],
        usage: '<Question>',
        cooldown: 3,
        permissions: 0,
        args: null,
    });

    client.registry.on('fun.8ball', ({message, args}) => {

        if (!args._[0])
            return message.channel.send('You need to ask a question.');

        message.channel.send(
            ball8list[Math.floor(Math.random() * ball8list.length)],
        );
    });
};