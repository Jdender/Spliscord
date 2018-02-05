//#region Import
import { Client } from 'discord.js';
import Events from './modules/events';
import { Config } from './interfaces/config';
//#endregion

//#region Unpack/Init
const { on, registerEvents } = Events;
//#endregion

//#region Because typescript
class Spliscord extends Client {
    public constructor(public config: Config) {
        super();

        registerEvents(this);
    }

    @on('debug')
    private _onDebug(message: string): void {
        console.info(message);
    }

}
//#endregion

import config from './config';
const client = new Spliscord(config);