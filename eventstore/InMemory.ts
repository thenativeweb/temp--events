import { EventEmitter } from 'node:events';
import { Event } from '../events/Event';
import type { EventCandidate } from '../events/EventCandidate';
import type { EventData } from '../events/EventData';
import type { EventStore } from './EventStore';

class InMemory extends EventEmitter implements EventStore {
	#events: Event<EventData>[];

	public constructor() {
		super();
		this.#events = [];
	}

	public append({
		eventCandidate,
		expectedRevision,
	}: {
		eventCandidate: EventCandidate<EventData>;
		expectedRevision: number | null;
	}): void {
		const nextId = this.#events.length;

		const event = new Event({
			id: nextId,
			subject: eventCandidate.getSubject(),
			data: eventCandidate.getData(),
		});

		const latestEventIdForSubject = this.#events
			.filter(event => event.getSubject() === eventCandidate.getSubject())
			.reduce((latestId: null | number, event) => Math.max(latestId ?? -1, event.getId()), null);

		if (expectedRevision !== latestEventIdForSubject) {
			throw new Error('revision conflict');
		}

		this.#events.push(event);
		this.emit('event-appended', { event });
	}

	public getEvents({
		subject,
	}: {
		subject: string;
	}): Event<EventData>[] {
		return this.#events.filter(event => event.getSubject() === subject);
	}
}

export { InMemory };
