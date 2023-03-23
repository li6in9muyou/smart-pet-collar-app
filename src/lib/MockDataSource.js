import { readable } from 'svelte/store';

class RandomNumbers {
	value = readable([], (set) => {
		set(Math.random());
		const handle = setInterval(() => {
			set(Math.random());
		}, 1000);
		return () => clearInterval(handle);
	});
	subscribe = this.value.subscribe;
}

const data_source = new (class MockDataSource {
	readings = new Map();
	windows = new Map();

	latestValueOf(label) {
		if (this.readings.has(label)) {
			return this.readings.get(label);
		} else {
			const new_reading = new RandomNumbers();
			this.readings.set(label, new_reading);
			return new_reading;
		}
	}
})();

export const latestValueOf = (label) => data_source.latestValueOf(label);
