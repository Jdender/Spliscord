import { Message } from 'discord.js';

export interface Wing {

    arg: ArgFn;

    then?: Wing | Wing[];

    executes?: ExecuteFn;
}

type ExecuteFn = (msg: Message, ...args: unknown[]) => any;

type ArgFn = (raw: string) => any;
