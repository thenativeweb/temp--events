class Remembered {
	#text: string;

	constructor({ text }: { text: string }) {
		this.#text = text;
	}

	getType() {
		return 'io.thenativeweb.todo.remembered';
	}

	getText() {
		return this.#text;
	}
}

export { Remembered };
