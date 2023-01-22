<script>
	import BackToHome from '$lib/BackToHome.svelte';
	import FormattedNumericReading from '$lib/FormattedNumericReading.svelte';
	import { latestValueOf, windowOf } from '$lib/MockDataSource';
	import { Line } from 'svelte-chartjs';
	import 'chart.js/auto';
	import { onMount } from 'svelte';

	const data = {
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

	let heartRate,
		bodyTemperature,
		bloodOxygenLevel,
		heartRateWindow,
		bodyTemperatureWindow,
		bloodOxygenLevelWindow;

	onMount(() => {
		heartRate = latestValueOf('跳每分钟');
		heartRateWindow = windowOf('跳每分钟');
		bodyTemperature = latestValueOf('摄氏度');
		bodyTemperatureWindow = windowOf('摄氏度');
		bloodOxygenLevel = latestValueOf('百分之');
		bloodOxygenLevelWindow = windowOf('百分之');

		heartRateWindow.subscribe((values) => (data.datasets[0].data = values));
	});
</script>

<svelte:head>
	<title>健康检测</title>
	<meta name="description" content="健康检测" />
</svelte:head>

<BackToHome />

<section>
	<FormattedNumericReading label="体温" value={$bodyTemperature} unit="℃" />
	<FormattedNumericReading label="心率" value={$heartRate} />
	<FormattedNumericReading label="血氧" value={$bloodOxygenLevel} unit="%" />
	<div class="chart">
		<div>
			<Line {data} options={op} />
		</div>
		<span>Hb</span>
	</div>
	<div class="chart">
		<div>
			<Line {data} options={op} />
		</div>
		<span>HbO2</span>
	</div>
</section>

<style>
	section {
		margin: 2rem 1rem 0 1rem;
		padding: 1rem;
		border: solid;
	}

	.chart {
		display: flex;
		align-items: stretch;
		border: solid;
		margin-top: 10px;
	}

	.chart > div {
		flex: 1;
	}

	.chart > span {
		flex: 0.1;
		border-left: solid;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
