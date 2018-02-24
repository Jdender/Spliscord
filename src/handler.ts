import { Events } from './events';
import { Spliscord } from './client';
import { BotConfig } from './configs';
import { Constructor } from './oneline';
const { on, once, registerEvents } = Events;

export function handler < T extends Constructor < Spliscord > > (Main: T) {
    class Handler extends Main {

        constructor(...args: any[]) {
            super(...args);
            registerEvents(this);
        }

        @on('message')
        handleOnMessage() {

        }

    }
    return Handler;
}