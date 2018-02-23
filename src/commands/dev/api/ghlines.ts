import { Command, CommandMessage, Client, Message, phin } from '../../../cmdUtil/commands.b';

const ghlines: Command = {
    name: 'dev.api.ghlines',
    aliases: ['dev.api.lines'],
    cooldown: 3,
    description: 'Get how meany lines a GitHub repo has.',
    usage: '[repo] [username for api]',
    perms: 4,
    args: false,
    userConf: false,
    guildConf: false,
    guildOnly: false,
    async execute(client: Client, message: CommandMessage) {

        const response = await phin({
                url: `https://api.github.com/repos/${message.args._[0]}/stats/contributors`,
                parse: 'json',
                headers: {
                    'User-Agent': message.author.username,
                },
            }).then(response => response.body
                .map(contributor => contributor.weeks
                    .reduce((lineCount, week) => lineCount + week.a - week.d, 0)))
            .then(lineCounts => lineCounts.reduce((lineTotal, lineCount) => lineTotal + lineCount));

        message.channel.send(`That GitHub repo has ${response} lines of code.`);
    },
}

export default ghlines;