import { createConnection } from 'typeorm';
import { Client, Message } from 'discord.js';
import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { handleMessage } from './handleMessage';

void async function() {

    await createConnection({
        type: 'postgres',
        url: process.env.POSTGRES_URL,
        synchronize: true,
        entities: [__dirname + '/**/*.entity.ts'],
    });

    const client = new Client();

    fromEvent(client, 'ready')
    .subscribe(() => {
        console.log('Ready!');
    });

    fromEvent<Message>(client, 'message')
    .pipe(handleMessage)
    .subscribe();

    await client.login(process.env.DISCORD_TOKEN);
}()
.catch(console.error);
