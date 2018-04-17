import { inspect } from 'util';

declare global {

    interface StringConstructor {
        clean(text: any): Promise<string>;
    }

    interface Array<T> {
        equals(array: any[]): boolean;
    }
}

String.clean = async (text: any): Promise<string> => {

    if (text instanceof Promise) text = await text;

    if (typeof text !== 'string') text = inspect(text);

    return text
    .replace(/`/g, '`' + String.fromCharCode(8203))
    .replace(/@/g, '@' + String.fromCharCode(8203))
    .replace(process.env.TOKEN, 'mfa.VkOb2v3T--NO--lWetW8tjND--TOKEN--QFTm--FOR--zq9PH--YOU--tG');
};

// From https://stackoverflow.com/a/14853974
Array.prototype.equals = function(array: any[]) {

    if (!array)
        return false;

    if (this.length !== array.length)
        return false;

    for (let i = 0; i < this.length; i++)
        if (this[i] !== array[i])
            return false;

    return true;
};
