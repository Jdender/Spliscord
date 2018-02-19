import {
    Client,
    Store,
    Command,
    CommandFile,
    flattenDeep,
    walk,
    TypeKeys,
} from './loader.b';

interface LoaderClient extends Client {
    cache: Store < any > ;
}

export async function loader (client: LoaderClient) {
    const rawCommandFiles: string[] = flattenDeep(await walk('./src/commands/'));
    const commandFiles: string[] = rawCommandFiles.filter((file: string) => file.split('.')[2] !== 'map');

    console.info(`[init] [load] Loading ${commandFiles.length} commands.`);

    for (const file of commandFiles) {
        if (file.split('.')[1] !== 'ts') continue;

        const { default: command }: CommandFile = await
        import (`../../${file}`); // The `../../` is needed.

        console.info(`[init] [load] Loading command: ${command.name}`);

        if (command.init) command.init(client);

        client.cache.dispatch({
            type: TypeKeys.SAVE_COMMAND,
            cmd: command,
        });
    }
}