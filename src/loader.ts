import { Events } from './event-dec';
import { Spliscord } from './client';
import { BotConfig } from './configs';
import { Constructor, walkflat } from './oneline';
import { Command } from './handler';
const { on, once, registerEvents } = Events;


export function loader < T extends Constructor < Spliscord > > (Main: T) {
    class Loader extends Main {

        constructor(...args: any[]) {
            super(...args);
            registerEvents(this);
        }

        @once('ready')
        async loadOnceReady() {

            await this.makePointers(this.config.commandPath);

            for (const name of this.commandPointers.keys())
                await this.loadCommand(name);


            this.commandNameCache =
                this.commands
                .array()
                .map(command => command.name)
                .concat(
                    this.commands
                    .array()
                    .map(command => command.aliases)
                    .reduce((names, aliases) => names.concat(aliases))
                )
                .map(name => name.split('.'));

        }

        async makePointers(dir: string) {
            const paths = (await walkflat(dir)).filter((file: string) => file.split('.')[1].match(/^(ts|js)$/));

            console.info(`[init] [load] Pointing to ${paths.length} commands.`);

            for (let path of paths) {

                const { default: commandClass }: { default: { new(): Command } } = await
                import (`../${path}`);

                const { name } = new commandClass;

                this.commandPointers.set(name, path);
            }
        }

        async loadCommand(name: string) {

            const path = this.commandPointers.get(name);
            if (!path) throw 'Name not found.';

            const loaded = this.commands.get(name);
            if (loaded) throw 'Command not loaded.';

            console.log(`[cmd] [load] Loading ${name} command from ${path}`);

            const { default: commandClass }: { default: { new(): Command } } = await
            import (`../${path}`);

            const command = new commandClass;

            if (command.init)
                command.init(this);

            this.commands.set(name, command);
        }

        unloadCommand(name: string) {

            const path = this.commandPointers.get(name);
            if (!path) throw 'Name not found.';

            const command = this.commands.get(name);
            if (!command) throw 'Command not loaded.';

            console.log(`[cmd] [load] Unloading ${name} command from ${path}`);

            delete require.cache[require.resolve(path)];

            if (command.shutdown)
                command.shutdown(this);

            this.commands.delete(name);
        }

    }
    return Loader;
}