<script>
	import { Line } from 'svelte-chartjs';
	import {
		Chart as ChartJS,
		Tooltip,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	} from 'chart.js';
	ChartJS.register(Tooltip, LineElement, LinearScale, PointElement, CategoryScale);

	import c from '$lib/chartjs.config';
	const cfg = c();

	export let label = '读数';
	export let numberStream = null;

	$: numberStream?.subscribe((v) => (cfg.data.datasets[0].data = v));
</script>

<div class="chart">
	<div>
		<Line data={cfg.data} options={cfg.options} />
	</div>
	<span>{label}</span>
</div>

<style>
	.chart {
		display: flex;
		align-items: stretch;
		border: solid;
		margin-top: 10px;
	}

	.chart > div {
		flex: 1;
		min-width: 0;
	}

	.chart > span {
		padding: 0 5px;
		border-left: solid;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
