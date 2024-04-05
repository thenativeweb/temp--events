import type { EventEmitter } from 'node:events';
import type { Event } from '../events/Event';
import type { EventData } from '../events/EventData';

interface EventStore extends EventEmitter {
	append({
		event,
	}: {
		event: Event<EventData>;
	}): void;

	getEvents({
		subject,
	}: {
		subject: string;
	}): Event<EventData>[];
}

export type { EventStore };
