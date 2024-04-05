interface StatisticsRow {
	key: string;
	value: number;
}

class StatisticsView {
	#statistics: StatisticsRow[];

	constructor() {
		this.#statistics = [];
	}

	create({
		key,
		value,
	}: {
		key: string;
		value: number;
	}): void {
		this.#statistics.push({ key, value });
	}

	increment({ key }: { key: string }) {
		const index = this.#statistics.findIndex(row => row.key === key);

		if (index === -1) {
			this.create({ key, value: 0 });
		}

		this.update({
			where: row => row.key === key,
			set: row => {
				row.value++;
			},
		});
	}

	readAll(): StatisticsRow[] {
		return this.#statistics;
	}

	update({
		where,
		set,
	}: {
		where: (row: StatisticsRow) => boolean;
		set: (row: StatisticsRow) => void;
	}): void {
		for (const row of this.#statistics) {
			if (where(row)) {
				set(row);
			}
		}
	}
}

export { StatisticsView };
