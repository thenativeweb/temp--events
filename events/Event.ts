import type { EventData } from './EventData';

// biome-ignore lint/style/useNamingConvention: Generic type names do not use Pascal case.
class Event<TData extends EventData> {
	#id: number;
	#time: Date;
	#subject: string;
	#data: TData;

	constructor({
		id,
		subject,
		data,
	}: {
		id: number;
		subject: string;
		data: TData;
	}) {
		this.#id = id;
		this.#time = new Date();
		this.#subject = subject;
		this.#data = data;
	}

	getType(): string {
		return this.#data.getType();
	}

	getId(): number {
		return this.#id;
	}

	getTime(): Date {
		return this.#time;
	}

	getSubject(): string {
		return this.#subject;
	}

	getData(): TData {
		return this.#data;
	}
}

export { Event };
