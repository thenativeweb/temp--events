interface TodoRow {
	id: string;
	text: string;
	revision: number;
}

class TodosView {
	#todos: TodoRow[];

	constructor() {
		this.#todos = [];
	}

	create({
		id,
		text,
		revision,
	}: {
		id: string;
		text: string;
		revision: number;
	}): void {
		this.#todos.push({ id, text, revision });
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
