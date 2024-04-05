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

	update({
		where,
		set,
	}: {
		where: (row: TodoRow) => boolean;
		set: (row: TodoRow) => void;
	}): void {
		this.#todos = this.#todos.map(row => {
			if (where(row)) {
				set(row);
			}

			return row;
		});
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
