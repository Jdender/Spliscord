import { Events } from './event-dec';
import { Spliscord } from './client';
import { BotConfig } from './configs';
import { Constructor } from './oneline';
const { on, once, registerEvents } = Events;

export function loader < T extends Constructor < Spliscord > > (Main: T) {
    class Loader extends Main {

        constructor(...args: any[]) {
            super(...args);
            registerEvents(this);
        }

        @once('ready')
        loadOnceReady() {

        }

        loadCommand(name: string) {

        }

        unloadCommand(name: string) {
            
        }

    }
    return Loader;
}