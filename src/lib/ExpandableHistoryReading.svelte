<script>
	import { Line } from 'svelte-chartjs';
	import 'chart.js/auto';
	import { onMount } from 'svelte';

	export let label = '读数';
	export let data = null;

	const config = {
		labels: new Array(30).fill(''),
		datasets: [
			{
				label: '',
				data: [],

				lineTension: 0.3,
				backgroundColor: 'rgba(225, 204,230, .3)',
				borderColor: 'rgb(205, 130, 158)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgb(205, 130, 158)',
				pointBackgroundColor: 'rgb(255, 255, 255)',
				pointBorderWidth: 5,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgb(0, 0, 0)',
				pointHoverBorderColor: 'rgba(220, 220, 220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10
			}
		]
	};
	const op = {
		plugins: {
			legend: { display: false }
		},
		scales: {
			y: {
				min: 0,
				max: 1
			}
		}
	};

	onMount(() => {
		data.subscribe((v) => (config.datasets[0].data = v));
	});
</script>

<div class="chart">
	<div>
		<Line data={config} options={op} />
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
