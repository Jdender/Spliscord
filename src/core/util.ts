import { inspect } from 'util';

export const clean = async (text: any): Promise<string> => {

    if (text instanceof Promise) text = await text;

    if (typeof text !== 'string') text = inspect(text);

    return text
    .replace(/`/g, '`' + String.fromCharCode(8203))
    .replace(/@/g, '@' + String.fromCharCode(8203))
    .replace(process.env.TOKEN, 'mfa.VkOb2v3T--NO--lWetW8tjND--TOKEN--QFTm--FOR--zq9PH--YOU--tG');
};

type forAwaitEachCallback = (val: any, index: number, array: any[]) => Promise<any>;

export async function forAwaitEach(array: any[], callback: forAwaitEachCallback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
};

// From https://stackoverflow.com/a/14853974
export function arrayEquals(that: any[], array: any[]) {

    if (!array)
        return false;

    if (that.length !== array.length)
        return false;

    for (let i = 0; i < that.length; i++)
        if (that[i] !== array[i])
            return false;

    return true;
};
