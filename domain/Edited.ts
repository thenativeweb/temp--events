class Edited {
	#text: string;

	constructor({ text }: { text: string }) {
		this.#text = text;
	}

	getType() {
		return 'io.thenativeweb.todo.edited';
	}

	getText() {
		return this.#text;
	}
}

export { Edited };
