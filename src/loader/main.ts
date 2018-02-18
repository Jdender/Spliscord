import {
    Client,
    Collection,
    Command,
    flattenDeep,
    walk,
} from './loader.b';

interface LoaderClient extends Client {
    commands: Collection < string, Command >
}

export async function loader(client: LoaderClient) {
    const rawCommandFiles: string[] = flattenDeep(await walk('./src/commands/'));
    const commandFiles: string[] = rawCommandFiles.filter((file: string) => file.split('.')[2] !== 'map');

    console.info(`[init] [load] Loading ${commandFiles.length} commands.`);

    for (const file of commandFiles) {
        if (file.split('.')[1] !== 'ts') continue;

        const { default: command } = require(`../../${file}`); // The `..` is needed.

        client.commands.set(command.name, command);
    }
}