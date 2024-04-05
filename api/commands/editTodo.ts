import type { Handler } from 'express';
import { flaschenpost } from 'flaschenpost';
import { Edited } from '../../domain/Edited';
import { Todo } from '../../domain/Todo';
import { Event } from '../../events/Event';
import type { EventStore } from '../../eventstore/EventStore';

const logger = flaschenpost.getLogger();

const editTodo = ({
	eventStore,
}: {
	eventStore: EventStore;
}): Handler => {
	return (req, res) => {
		const { id, text } = req.body;
		const subject = `/todo/${id}`;

		logger.info('edit todo received', { id, text });

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

		const edited = new Event({
			subject,
			data: new Edited({
				text,
			}),
		});

		logger.info('edited event created', { edited });

		eventStore.append({ event: edited });

		res.status(200).json({});
	};
};

export { editTodo };
