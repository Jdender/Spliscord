import { Command, CommandMessage, Client, phin } from '../../cmdHandler/commands.b';

const catfacts: Command = {
    name: 'api.catfacts',
    aliases: ['api.catfact', 'api.factsrightmeow', 'api.factsfurever'],
    cooldown: 5,
    description: 'Get a random cat fact from cat-facts. (https://alexwohlbruck.github.io/cat-facts/).',
    guildOnly: false,
    async execute(client: Client, message: CommandMessage) {

        const response = await phin({
            url: 'http://cat-fact.herokuapp.com/facts',
            parse: 'json',
        });

        message.channel.send(`"${response.body.text}"`);

    },
}

export default catfacts;