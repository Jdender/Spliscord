import { KlasaUser } from 'klasa';

declare module 'klasa' {

    interface KlasaMessage {

        author: KlasaUser;
    }
}
