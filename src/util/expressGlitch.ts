import express = require('express');

// Simple ping express server for glitch upkeep

express()
.get('/', (_, res: any) => res.sendStatus(200))
.listen(process.env.PORT);
