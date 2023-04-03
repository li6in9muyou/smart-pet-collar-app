import { derived } from 'svelte/store';

export class SlidingWindow {
	values = [];
	size = 30;

	constructor(size = 30) {
		this.size = size;
	}

	add(x) {
		this.values.push(x);
		if (this.values.length === this.size) {
			this.values.shift();
		}
	}
}

export class SlidingWindowAggregation {
	store;
	subscribe;
	constructor(numberStream) {
		const window = new SlidingWindow();
		this.store = derived(numberStream, (value) => {
			window.add(value);
			return window.values;
		});
		this.subscribe = this.store.subscribe;
	}
}

export function sleep(delayMilliSecond, resolveValue) {
	return new Promise((resolve) => {
		setTimeout(() => resolve(resolveValue), delayMilliSecond);
	});
}
