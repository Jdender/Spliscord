import { applyOptions } from '../../util/applyOptions';
import { Command, KlasaMessage} from 'klasa';

import fetch from 'node-fetch';
import cheerio = require('cheerio');
import querystring = require('querystring');

@applyOptions({
    name: 'google',
    description: 'Get the fisrt url that shows up from searching a query.',
    usage: '<Search:string> [...]',
    aliases: ['search'],
})
export default class extends Command {

    async run(message: KlasaMessage, [...search]: string[]) {

        const query = encodeURIComponent(search.join('\s'));
        
        const searchUrl = `https://www.google.com/search?q=${query}`;

        return fetch(searchUrl)
            .then(res => res.text())
            .then(this.cherrioGoogle)
            .then(this.parseQuery)
            .then(result => message.send(`I found a result:\n${result}`))
            .catch(() => message.send('I couldn\'t find a result.'));
    }

    private cherrioGoogle = (html: string) =>
        cheerio
        .load(html)('.r')
        .first().find('a')
        .first().attr('href');
    
    private parseQuery = (query: string) =>
        querystring.parse(query.replace('/url?', '')).q;
}
