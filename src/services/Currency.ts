import { SchemaFolder, KlasaUser } from 'klasa';

interface BalanceReturnObject {
    prebal: number;
    newbal: number;
}

export abstract class Currency {

    static initDatabase = async (userSchema: SchemaFolder | null) => {

        if (!userSchema) return;

        if (!userSchema.has('balance'))
            await userSchema.add('balance', { 
                type: 'integer',
                default: 0,
                configurable: false,
            });
    }

    static getBalance = (target: KlasaUser): number => target.settings.get('balance');

    static setBalance = async (target: KlasaUser, amount: number): Promise<BalanceReturnObject> => {

        const prebal = Currency.getBalance(target);

        await target.settings.update('balance', amount);

        return {
            prebal,
            newbal: Currency.getBalance(target),
        };
    };

    static addBalance = async (target: KlasaUser, amount: number) =>

        Currency.setBalance(target, Currency.getBalance(target) + amount);
    
    static takeBalance = async (target: KlasaUser, amount: number) =>

        Currency.setBalance(target, Currency.getBalance(target) - amount);
}
