import type { Handler } from 'express';
import { flaschenpost } from 'flaschenpost';
import { Edited } from '../../domain/Edited';
import { Todo } from '../../domain/Todo';
import { EventCandidate } from '../../events/EventCandidate';
import type { EventStore } from '../../eventstore/EventStore';

const logger = flaschenpost.getLogger();

const editTodo = ({
	eventStore,
}: {
	eventStore: EventStore;
}): Handler => {
	return (req, res) => {
		const { id, text, expectedRevision } = req.body;
		const subject = `/todo/${id}`;

		logger.info('edit todo received', { id, text });

		if (text === '') {
			res.status(400).json({ message: 'text is required' });
			return;
		}

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
		if (todo.getText() === text) {
			logger.error('text must be different', { id });
			res.status(400).json({ message: 'text must be different' });
			return;
		}

		const edited = new EventCandidate({
			subject,
			data: new Edited({
				text,
			}),
		});

		logger.info('edited event created', { edited });

		try {
			eventStore.append({
				eventCandidate: edited,
				expectedRevision
			});
		} catch (ex: unknown) {
			if (!(ex instanceof Error)) {
				throw ex;
			}
			logger.error(ex.message);
			res.status(500).json({ message: ex.message });
			return;
		}

		res.status(200).json({});
	};
};

export { editTodo };
