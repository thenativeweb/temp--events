import type { Remembered } from '../domain/Remembered';
import type { Event } from '../events/Event';
import type { EventData } from '../events/EventData';
import type { StatisticsView } from '../views/StatisticsView';
import type { TodosView } from '../views/TodosView';

const runProjections = ({
	todosView,
	statisticsView,
}: {
	todosView: TodosView;
	statisticsView: StatisticsView;
}) => {
	return ({ event }: { event: Event<EventData> }): void => {
		switch (event.getType()) {
			case 'io.thenativeweb.todo.remembered': {
				const remembered = event.getData() as Remembered;
				const id = event.getSubject().split('/')[2];
				const text = remembered.getText();

				todosView.create({ id, text });
				statisticsView.increment({ key: 'remembered-todos' });
				break;
			}
			case 'io.thenativeweb.todo.completed': {
				const id = event.getSubject().split('/')[2];

				todosView.delete({
					where: todo => todo.id === id,
				});
				break;
			}
			default: {
				throw new Error('unknown event type');
			}
		}
	};
};

export { runProjections };
