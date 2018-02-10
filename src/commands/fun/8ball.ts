import { Command, CommandMessage, Client } from '../../cmdHandler/commands.b';

const responses = [
    'Unclear, ask again later',
    'Soon',
    'Yes',
    'Absolutely',
    'Yep',
    'Nope',
    'Sure',
    'Never',
    'Magic 8-ball is currently unavailable, please leave a message after the tone.',
    'When you are ready',
    'Hopefully',
    'Hopefully not',
    'Wait what, why would you even ask that?',
    'What kind of a question is that?',
    'Haha, funny joke'
];

const ball: Command = {
    name: 'fun.8ball',
    usage: '{question}',
    description: 'Asks the magic 8-ball a question',
    cooldown: 3,
    execute(client: Client, message: CommandMessage) {
        const response = responses[Math.floor(Math.random() * responses.length)];

        message.channel.send(`:8ball: ${response}`);
    },
};

export default ball;