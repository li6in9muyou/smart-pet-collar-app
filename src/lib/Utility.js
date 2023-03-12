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