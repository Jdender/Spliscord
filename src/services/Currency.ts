import { SchemaFolder } from 'klasa';

export abstract class Currency {

    static initDatabase = (userSchema?: SchemaFolder) => 

        // Schema exitsts and does not have, then add it
        !!userSchema &&
        !userSchema.has('balance') &&
        userSchema.add('balance', { 
            type: 'integer',
            default: 0,
            configurable: false,
        });

}
