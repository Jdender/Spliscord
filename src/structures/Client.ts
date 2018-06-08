import { KlasaClient, Store, Piece, PieceOptions } from 'klasa';
import importful from 'importful';
import { join as joinPath } from 'path';

// INFO: KlasaClient options at the bottom of this file
// WARNING: This file is one huge monkey patch, understanding is not expected

// Using importful for loading, but still want to use built in things
Store.prototype.loadAll = async function() {
    this.clear();
    await (Store as any).walk(this, true); // typeof Store has no .walk()
    return this.size;
};

// Add required 'type' opt to PieceOptions
interface RegisterPieceOpts extends PieceOptions {
    type: keyof Client;
}

// Where most of the monkey patch happens
export class Client extends KlasaClient {

    constructor(options: any) {
        super(options);

        // Call imports *after* the client is ready
        this.on('ready', () =>
            importful(joinPath(__dirname, '../imports/'), this)
        );
    }

    private logTimes = 0;

    emit(event: string, ...args: any[]): boolean {

        // Skip the first two log events to ignore the default loading logs
        if (event === 'log' && this.logTimes <= 1) {
            this.logTimes++;
            return false;
        }

        // Call original function
        return KlasaClient.prototype.emit.call(this, event, ...args);
    }

    // Piece decorator for easly registering piece
    // I made this pile of types so I don't have to do it in every file; don't worry about how it works
    public RegisterPiece = <O extends RegisterPieceOpts>(opts: O) =>
    <T extends Piece>(piece: { new(...args: any[]): T}) =>
        void (this[opts.type] as Store<string, T>).set(new piece(client, this[opts.type], '', false, opts));
}

// Change klasa client options here
export const client = new Client({
    clientOptions: {},
    prefix: '`',
    readyMessage: (client: Client) => `${client.user.tag}, Runing in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`
});
