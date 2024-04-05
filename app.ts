import http from 'node:http';
import { flaschenpost } from 'flaschenpost';
import { processenv } from 'processenv';
import { getApi } from './api/getApi';
import type { EventStore } from './eventstore/EventStore';
import { InMemory } from './eventstore/InMemory';
import { runProjections } from './projections/runProjections';
import { StatisticsView } from './views/StatisticsView';
import { TodosView } from './views/TodosView';

const logger = flaschenpost.getLogger();

const port = processenv('PORT') ?? 3_000;

const eventStore: EventStore = new InMemory();
const todosView = new TodosView();
const statisticsView = new StatisticsView();

eventStore.on(
	'event-appended',
	runProjections({
		todosView,
		statisticsView,
	}),
);

const api = getApi({ eventStore, todosView, statisticsView });
const server = http.createServer(api);

server.listen(port, () => {
	logger.info('server started', { port });
});
