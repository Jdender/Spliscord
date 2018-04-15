import chalk from 'chalk';
import moment = require('moment');
import { inspect } from 'util';

interface Colors {
    [index: string]: [string, typeof chalk.blue, typeof console.log];
}

export class Logger {

    // Table of tags, colors, and methods
    private colors: Colors = {
        log:   [chalk.bgBlue('LOG'),          chalk.blue,          console.log],
        warn:  [chalk.black.bgYellow('WARN'), chalk.yellow,        console.warn],
        error: [chalk.bgRed('ERROR'),         chalk.red,           console.error],
        debug: [chalk.black.bgGreen('DEBUG'), chalk.green,         console.log],
        cmd:   [chalk.black.bgWhite('CMD'),   chalk.white,         console.log],
        ready: [chalk.black.bgGreen('READY'), chalk.black.bgGreen, console.log],
    };

    // Public methods to log with
    public log = (text: string) => this._log('log', text);
    public warn = (text: string) => this._log('warn', text);
    public error = (text: string | Error) => this._log('error', text);
    public debug = (text: string) => this._log('debug', text);
    public cmd = (text: string) => this._log('cmd', text);
    public ready = (text: string) => this._log('ready', text);

    // Main function
    private _log(type: string, content: any) {

        const [ tag, color, put] = this.colors[type]; // Get things from table
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss'); // Date as string

        if (content instanceof Error) content = content.stack || content.message; // Turn errors into strings
        if (typeof content !== 'string') content = inspect(content); // Turn objects into strings
        // Remove token just in case
        content = content.replace(process.env.TOKEN!, 'mfa.VkOb2v3T--NO--lWetW8tjND--TOKEN--QFTm--FOR--zq9PH--YOU--tG');

        // Log the final message
        put(`<${timestamp}>: [${tag}] ${color(content)}`);
    }

}
