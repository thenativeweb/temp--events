interface TodoRow {
	id: string;
	text: string;
}

class TodosView {
	#todos: TodoRow[];

	constructor() {
		this.#todos = [];
	}

	create({
		id,
		text,
	}: {
		id: string;
		text: string;
	}): void {
		this.#todos.push({ id, text });
	}

	readAll(): TodoRow[] {
		return this.#todos;
	}
}

export { TodosView };
