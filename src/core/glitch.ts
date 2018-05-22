import { Client } from 'discord.js';
import express = require('express');

export default (client: Client) => {
    if (process.env.PORT) {

        const app = express();

        app.get('/', (request, response) => {
            client.logger.debug(`Glitch Ping Received ${Date.now()}`);
            response.sendStatus(200);
        });

        app.listen(process.env.PORT);
    }
};
