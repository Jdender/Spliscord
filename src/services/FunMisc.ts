import fetch, { Response } from 'node-fetch';
import cheerio = require('cheerio');
import { MessageAttachment } from 'discord.js';

export abstract class FunMisc {

    // For fetching apis
    static fetchJson = <R>(url: string, then: (res: any) => R) =>

        fetch(url)
        .then(res => res.json())
        .then(then)
        .catch(() => null);

    // For fetching websites
    static fetchCheerio = (url: string) =>

        fetch(url)
        .then(res => res.text())
        .then(cheerio.load)
        .catch(() => cheerio.load('')); // Blank page if error

    // Return a random element from a array
    static randomEle = <T>(arr: T[]): T =>
        
        arr[Math.floor(Math.random() * arr.length)];

    // Get attachment name with proper file extention
    static makeAttachment = (type: string, url: string) =>
    
        new MessageAttachment(url, `${type}${url.slice(url.lastIndexOf('.'), url.length)}`);
}
