import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

const timeSeriesData = pb.collection('time_series_data');

class LatestData {
	s = writable(NaN);
	subscribe = this.s.subscribe;

	constructor(model, label) {
		model
			.getFirstListItem(`unit="${label}"`, {
				sort: '-recordedDateTime'
			})
			.then((r) => {
				this.s.set(r.value);
			})
			.catch(console.error);
		model.subscribe('*', (e) => {
			this.s.set(e.record.value);
		});
	}
}

export function latestValueOf(label) {
	return new LatestData(timeSeriesData, label);
}
