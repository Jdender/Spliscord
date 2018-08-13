import { applyOptions } from '../util/applyOptions';
import { Event, EventOptions } from 'klasa';
import { Currency } from '../services/Currency';

@applyOptions<EventOptions>({
    name: 'initServices',
    event: 'ready',
    once: true,
})
export default class extends Event {

    async run() {
        
        await Currency.initDatabase(this.client.gateways.users.schema);
    }
}
