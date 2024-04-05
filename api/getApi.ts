import express, { json } from 'express';
import type { Application } from 'express';
import type { EventStore } from '../eventstore/EventStore';
import type { StatisticsView } from '../views/StatisticsView';
import type { TodosView } from '../views/TodosView';
import { rememberTodo } from './commands/rememberTodo';
import { getOpenApi } from './openapi/getOpenApi';
import { getStatistics } from './queries/getStatistics';
import { getTodos } from './queries/getTodos';

const getApi = ({
	eventStore,
	todosView,
	statisticsView,
}: {
	eventStore: EventStore;
	todosView: TodosView;
	statisticsView: StatisticsView;
}): Application => {
	const api = express();

	api.use(json());

	// Commands
	api.post('/api/remember-todo', rememberTodo({ eventStore }));

	// Queries
	api.get('/api/todos', getTodos({ todosView }));
	api.get('/api/statistics', getStatistics({ statisticsView }));

	// Other
	api.get('/open-api.yaml', getOpenApi());

	return api;
};

export { getApi };
