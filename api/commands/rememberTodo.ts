import type { Handler } from 'express';
import { flaschenpost } from 'flaschenpost';
import { v4 as uuid } from 'uuid';
import { Remembered } from '../../domain/Remembered';
import { EventCandidate } from '../../events/EventCandidate';
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
		const subject = `/todo/${id}`;

		logger.info('remember todo received', { id, text });

		if (text === '') {
			res.status(400).json({ message: 'text is required' });
			return;
		}

		const remembered = new EventCandidate({
			subject,
			data: new Remembered({
				text,
			}),
		});

		logger.info('remembered event created', { remembered });

		try {
			eventStore.append({
				eventCandidate: remembered,
				expectedRevision: null
			});
		} catch (ex: unknown) {
			if (!(ex instanceof Error)) {
				throw ex;
			}
			logger.error(ex.message);
			res.status(500).json({ message: ex.message });
			return;
		}

		res.status(200).json({ id });
	};
};

export { rememberTodo };
