import type { EventData } from './EventData';

// biome-ignore lint/style/useNamingConvention: Generic type names do not use Pascal case.
class EventCandidate<TData extends EventData> {
	#subject: string;
	#data: TData;

	constructor({
		subject,
		data,
	}: {
		subject: string;
		data: TData;
	}) {
		this.#subject = subject;
		this.#data = data;
	}

	getType(): string {
		return this.#data.getType();
	}

	getSubject(): string {
		return this.#subject;
	}

	getData(): TData {
		return this.#data;
	}
}

export { EventCandidate };
