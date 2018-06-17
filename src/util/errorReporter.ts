import { KlasaClient } from 'klasa';
import { WebhookClient } from 'discord.js';


export default (client: KlasaClient) => {

    if (!process.env.REPORTER_ID || !process.env.REPORTER_TOKEN) process.exit(1);

    // Webhook error reporter
    const reporter = new WebhookClient(process.env.REPORTER_ID!, process.env.REPORTER_TOKEN!);

    // Handle uncaught errors using process
    process
    .on('unhandledRejection', e => reporter.send(`UNHANDLED REJECTION: ${e.stack || e}`)) 
    .on('uncaughtException', e => reporter.send(`UNCAUGHT EXCEPTION: ${e.stack || e}`));

    // Handle klasa errors using client
    client
    .on('warn', (e: any) => reporter.send(`KLASA WARNING: ${e.stack || e}`))
    .on('error', (e: any) => reporter.send(`KLASA ERROR: ${e.stack || e}`))
    .on('wtf', (e: any) => reporter.send(`KLASA WTF ERROR: ${e.stack || e}`))
}