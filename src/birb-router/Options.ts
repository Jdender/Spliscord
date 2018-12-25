import { Message } from 'discord.js';
import { Wing } from './Wing';

export interface Options {
    prefix?: string;
    mentionPrefix: boolean;
    rootWing: Wing;
}

export type OptionsResolvable = Partial<Options> | ((msg: Message) => Partial<Options>)

export type OptionsFn = (msg: Message) => Options;

export const getOptionFn = (opts: OptionsResolvable): OptionsFn  => (msg: Message) => (
    Object.assign(defaultOptions, opts instanceof Function ? opts(msg) : opts)
);

const defaultOptions: Options = {
    mentionPrefix: false,
    rootWing: {
        arg: () => {},
    },
};
