import { Command, CommandMessage, Client, phin } from '../../cmdUtil/commands.b';

const catfacts: Command = {
    name: 'api.catfacts',
    aliases: ['api.catfact', 'api.factsrightmeow'],
    cooldown: 5,
    description: 'Get a random cat fact from cat-facts. (https://alexwohlbruck.github.io/cat-facts/).',
    perms: 0,
    args: false,
    userConf: false,
    guildConf: false,
    guildOnly: false,
    async execute(client: Client, message: CommandMessage) {

        const response = await phin({
            url: 'https://cat-fact.herokuapp.com/facts',
            parse: 'json',
        });

        message.channel.send(`"${response.body.text}"`);

    },
}

export default catfacts;