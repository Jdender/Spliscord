import { Command, CommandMessage, Client, phin } from '../../cmdHandler/commands.b';

const cat: Command = {
    name: 'api.cat',
    aliases: ['api.meow'],
    cooldown: 5,
    description: 'Get a random cat image from `random.cat`.',
    guildOnly: false,
    async execute(client: Client, message: CommandMessage) {

        const response = await phin({
            url: 'https://random.cat/meow',
            parse: 'json',
        });

        message.channel.send(response.body.file);

    },
}

export default cat;