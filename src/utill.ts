import { inspect } from 'util';

export const clean = async (text: any): Promise<string> => {

    if (text instanceof Promise) text = await text;

    if (typeof text !== 'string') text = inspect(text);

    return text
    .replace(/`/g, '`' + String.fromCharCode(8203))
    .replace(/@/g, '@' + String.fromCharCode(8203))
    .replace(process.env.TOKEN, 'mfa.VkOb2v3T--NO--lWetW8tjND--TOKEN--QFTm--FOR--zq9PH--YOU--tG');
};

declare global {

    interface Array<T> {
        forAwaitEach(callback: (val: any, index: number, array: any[]) => Promise<any>): Promise<void>;
        equals(array: any[]): boolean;
    }
}

Array.prototype.forAwaitEach = async function (callback) {
    for (let index = 0; index < this.length; index++) {
      await callback(this[index], index, this)
    }
};

// From https://stackoverflow.com/a/14853974
Array.prototype.equals = function (array) {

    if (!array)
        return false;

    if (this.length !== array.length)
        return false;

    for (let i = 0; i < this.length; i++)
        if (this[i] !== array[i])
            return false;

    return true;
};
