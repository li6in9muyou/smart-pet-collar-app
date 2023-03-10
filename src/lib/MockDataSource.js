import { derived, readable } from 'svelte/store';
import { SlidingWindow } from '$lib/Utility.js';

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

	windowOf(label) {
		if (this.windows.has(label)) {
			return this.windows.get(label);
		} else {
			const w = new SlidingWindow();
			const window = derived(this.latestValueOf(label), (value) => {
				w.add(value);
				return w.values;
			});
			this.windows.set(label, window);
			return window;
		}
	}
})();

export const latestValueOf = (label) => data_source.latestValueOf(label);
export const windowOf = (label) => data_source.windowOf(label);
