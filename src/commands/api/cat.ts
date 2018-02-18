import { Command, CommandMessage, Client, phin } from '../../cmdUtil/commands.b';

const cat: Command = {
    name: 'api.cat',
    aliases: ['api.meow'],
    cooldown: 5,
    description: 'Get a random cat image from `random.cat`.',
    perms: 0,
    args: false,
    userConf: false,
    guildConf: false,
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