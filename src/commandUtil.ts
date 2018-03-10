import { Spliscord } from './client';
import { inspect } from 'util';

export { Spliscord, inspect };
export { Command } from './handler';
export { MessageCommandMeta } from './msgCmdMeta';
export { Message } from 'discord.js';


export async function clean(client: Spliscord, xtext: any, depth ? : number | null, color ? : boolean) {

    let text: string;

    if (xtext instanceof Promise) xtext = await xtext;

    if (typeof xtext !== 'string') text = inspect(xtext, false, depth, color);
    else text = xtext;

    text = text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
        .replace(client.token, 'mfa.VkO_2v3T--NO--lWetW_tjND--TOKEN--QFTm--FOR--zq9PH--YOU--tG');

    return text;
}