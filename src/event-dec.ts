// Will move to Yatsul soontm.
//import 'reflect-metadata';
import { EventEmitter } from 'events';

interface EventMeta {
    event: string;
    method: string;
    once: boolean;
    args: any[];
    attached ? : boolean;
}

export class Events {

    public static on(event: string, ...args: any[]) {
        return Events._addEvent(event, false, ...args);
    }

    public static once(event: string, ...args: any[]) {
        return Events._addEvent(event, true, ...args);
    }

    private static _addEvent(event: string, once: boolean, ...args: any[]) {
        return function < Target extends EventEmitter > (target: Target, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {

            const events: EventMeta[] = Reflect.getMetadata('events', target) || [];
            events.push({ event, method: key, once, args });
            Reflect.defineMetadata('events', events, target);

            return descriptor;
        }
    }

    public static registerEvents(emitter: EventEmitter): void {
        
		if (!(emitter instanceof EventEmitter))
			throw new TypeError('Events can only be registered on classes extending EventEmitter');

		if (typeof Reflect.getMetadata('events', emitter.constructor.prototype) === 'undefined') return;

        const metaTarget: any = emitter.constructor.prototype;
        
		for (const event of Reflect.getMetadata('events', metaTarget) as EventMeta[]) {

			if (!(emitter as any)[event.method]) continue;
			if (event.attached) continue;

			event.attached = true;
            const eventHandler: (...eventArgs: any[]) => void = 
                (...eventArgs) => (emitter as any)[event.method](...eventArgs, ...event.args);

			emitter[event.once ? 'once' : 'on'](event.event, eventHandler);
		}
	}
}