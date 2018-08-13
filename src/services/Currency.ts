import { SchemaFolder, KlasaUser } from 'klasa';

interface BalanceReturnObject {
    prebal: number;
    newbal: number;
}

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

    static getBalance = (target: KlasaUser): number => target.configs.get('balance');

    static setBalance = async (target: KlasaUser, amount: number): Promise<BalanceReturnObject> => {

        const prebal = Currency.getBalance(target);

        await target.configs.update('balance', amount);

        return {
            prebal,
            newbal: Currency.getBalance(target),
        };
    };

    static giveBalance = async (target: KlasaUser, amount: number) =>

        Currency.setBalance(target, Currency.getBalance(target) + amount);
    
    static takeBalance = async (target: KlasaUser, amount: number) =>

        Currency.setBalance(target, Currency.getBalance(target) - amount);
}
