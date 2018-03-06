import { BotConfig } from './configs';

export const config: BotConfig = {
    token: {
        path: '../../tokens.json',
        name: 'Spliscord',
    },
    client: {
        disableEveryone: true,
    },
    commandPath: './src/commands',
    maxSubCommandDepth: 3,
    contributors: [{
            name: 'jdenderplays',
            id: '250432205145243649',
            roles: [4, 5, 6]
        },
        {
            name: 'House Master',
            id: '271434593939226624',
            roles: [4, 5]
        }
    ]
}