import type { Handler } from 'express';
import type { TodosView } from '../../views/TodosView';

const getTodos = ({
	todosView,
}: {
	todosView: TodosView;
}): Handler => {
	return (_req, res) => {
		const todos = todosView.readAll();
		res.status(200).json(todos);
	};
};

export { getTodos };
