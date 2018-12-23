import { pipe } from 'rxjs';
import { Message } from 'discord.js';
import { map, filter } from 'rxjs/operators';

export interface Context {
    message: Message;
    rawArgs: string[];
}

export const handleMessage = pipe(
    map((message: Message) => ({ message })),
    map(ctx => ({
        ...ctx,
        rawArgs: parcelRawArgs(ctx.message.content),
    })),
    filter(ctx => ctx.rawArgs[0] === 'debug'),
    map(ctx => ctx.message.channel.send(JSON.stringify(ctx.rawArgs)))
);

const parcelRawArgs = (content: string) =>
    content.slice('`'.length).split(/\s+/g);
