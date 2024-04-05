import { EventEmitter } from 'node:events';
import type { Event } from '../events/Event';
import type { EventData } from '../events/EventData';
import type { EventStore } from './EventStore';

class InMemory extends EventEmitter implements EventStore {
	#events: Event<EventData>[];

	public constructor() {
		super();
		this.#events = [];
	}

	public append(event: Event<EventData>): void {
		this.#events.push(event);
		this.emit('event-appended', { event });
	}
}

export { InMemory };
