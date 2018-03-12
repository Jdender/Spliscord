import express = require('express');

const app = express();

app.get('/', (request, response) => {
    console.log(`[glitch] [ping] Ping Received {${Date.now()}}`);
    response.sendStatus(200);
});

app.listen(process.env.PORT);