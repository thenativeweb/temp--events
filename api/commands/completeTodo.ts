import type { Handler } from 'express';
import { flaschenpost } from 'flaschenpost';
import { Completed } from '../../domain/Completed';
import { Todo } from '../../domain/Todo';
import { Event } from '../../events/Event';
import type { EventStore } from '../../eventstore/EventStore';

const logger = flaschenpost.getLogger();

const completeTodo = ({
	eventStore,
}: {
	eventStore: EventStore;
}): Handler => {
	return (req, res) => {
		const { id } = req.body;
		const subject = `/todo/${id}`;

		logger.info('complete todo received', { id });

		const events = eventStore.getEvents({ subject });
		if (events.length === 0) {
			logger.error('todo not found', { id });
			res.status(404).json({ message: 'todo not found' });
			return;
		}

		const todo = new Todo();
		for (const event of events) {
			todo.apply({ event });
		}

		if (todo.getStatus() !== 'pending') {
			logger.error('todo must be pending', { id });
			res.status(400).json({ message: 'todo must be pending' });
			return;
		}

		const completed = new Event({
			subject,
			data: new Completed(),
		});

		logger.info('completed event created', { completed });

		eventStore.append({ event: completed });

		res.status(200).json({});
	};
};

export { completeTodo };
