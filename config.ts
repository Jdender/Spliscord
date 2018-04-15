import { BotConfig } from './src/classes/settings';

export const config: BotConfig = {
    client: {
        disableEveryone: true,
    },
    maxSubCommandDepth: 3,
    contributors: [{
            name: 'jdenderplays',
            id: '250432205145243649',
            roles: [4, 5, 6],
        },
        {
            name: 'House Master',
            id: '271434593939226624',
            roles: [4, 5],
        },
    ],
};
