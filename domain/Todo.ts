import type { Event } from '../events/Event';
import type { EventData } from '../events/EventData';
import type { Edited } from './Edited';
import type { Remembered } from './Remembered';

class Todo {
	#status: 'pending' | 'completed';
	#text: string;

	public getStatus() {
		return this.#status;
	}

	public gettext() {
		return this.#text;
	}

	public constructor() {
		this.#status = 'pending';
		this.#text = '';
	}

	public apply({ event }: { event: Event<EventData> }) {
		switch (event.getType()) {
			case 'io.thenativeweb.todo.remembered': {
				const remembered = event.getData() as Remembered;
				this.#text = remembered.getText();
				break;
			}
			case 'io.thenativeweb.todo.edited': {
				const edited = event.getData() as Edited;
				this.#text = edited.getText();
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
