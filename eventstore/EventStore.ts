import type { EventEmitter } from 'node:events';
import type { Event } from '../events/Event';
import type { EventCandidate } from '../events/EventCandidate';
import type { EventData } from '../events/EventData';

interface EventStore extends EventEmitter {
	append({
		eventCandidate,
		expectedRevision
	}: {
		eventCandidate: EventCandidate<EventData>;
		expectedRevision: number | null;
	}): void;

	getEvents({
		subject,
	}: {
		subject: string;
	}): Event<EventData>[];
}

export type { EventStore };
