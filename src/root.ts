import { Client } from 'discord.js';
import { Router } from './birb-router';
import { importful } from 'importful';

void async function() {

    const wings = importful(__dirname + '');

    const router = new Router({
        prefix: '`',
    });

    const client = new Client();

    client.on('ready', () => console.log('Ready!'));

    client.login(process.env.DISCORD_TOKEN);
}();
