import type { Handler } from 'express';
import { flaschenpost } from 'flaschenpost';
import { v4 as uuid } from 'uuid';
import { Remembered } from '../../domain/Remembered';
import { Event } from '../../events/Event';
import type { EventStore } from '../../eventstore/EventStore';

const logger = flaschenpost.getLogger();

const rememberTodo = ({
	eventStore,
}: {
	eventStore: EventStore;
}): Handler => {
	return (req, res) => {
		const { text } = req.body;
		const id = uuid();

		logger.info('remember todo received', { id, text });

		if (text === '') {
			res.status(400).json({ message: 'text is required' });
			return;
		}

		const remembered = new Event({
			subject: `/todo/${id}`,
			data: new Remembered({
				text,
			}),
		});

		logger.info('remembered event created', { remembered });

		eventStore.append(remembered);

		res.status(200).json({ id });
	};
};

export { rememberTodo };
