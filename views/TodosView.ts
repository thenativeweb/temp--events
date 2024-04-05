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

	delete({
		where,
	}: {
		where: (row: TodoRow) => boolean;
	}): void {
		this.#todos = this.#todos.filter(row => !where(row));
	}
}

export { TodosView };
