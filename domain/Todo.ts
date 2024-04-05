import type { Event } from '../events/Event';
import type { EventData } from '../events/EventData';

class Todo {
	#status: 'pending' | 'completed';

	public getStatus() {
		return this.#status;
	}

	public constructor() {
		this.#status = 'pending';
	}

	public apply({ event }: { event: Event<EventData> }) {
		switch (event.getType()) {
			case 'io.thenativeweb.todo.remembered': {
				break;
			}
			case 'io.thenativeweb.todo.completed': {
				this.#status = 'completed';
				break;
			}
			default: {
				throw new Error('unknown event type');
			}
		}
	}
}

export { Todo };
