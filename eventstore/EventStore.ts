import type { EventEmitter } from 'node:events';
import type { Event } from '../events/Event';
import type { EventData } from '../events/EventData';

interface EventStore extends EventEmitter {
	append(event: Event<EventData>): void;
}

export type { EventStore };
