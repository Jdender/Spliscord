import { Message } from 'discord.js';
import { OptionsResolvable, getOptionFn, OptionsFn } from './Options';

export class Router {

    private getOptions: OptionsFn;

    constructor(opts: OptionsResolvable) {

        this.getOptions = getOptionFn(opts);
    }
}

