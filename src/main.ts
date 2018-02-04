import { Client } from 'discord.js';
import config from './config';

interface Config {
    foo: string; // TODO
}

class Spliscord extends Client {
    public constructor(public config: Config) {
        super();

        this.emit('debug', 'test')
    }

    @on('debug') // TODO
    private _onDebug(message: string): void {
        console.info(message);
    }
}


const client = new Spliscord(config);