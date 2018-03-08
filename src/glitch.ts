import express = require('express');
import { get } from 'http';

const app = express();

app.get('/', (request, response) => {
    console.log(Date.now() + ' Ping Received');
    response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
    get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);