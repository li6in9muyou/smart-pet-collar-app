import { readable } from 'svelte/store';

export default readable('https://placehold.jp/320x320.png?text=capture-1', (set) => {
	let i = 2;
	setInterval(() => {
		set('https://placehold.jp/320x320.png?text=capture-' + i);
		i += 1;
	}, 1100);
});
