<script>
	import BackToHome from '$lib/BackToHome.svelte';
	import FormattedNumericReading from '$lib/FormattedNumericReading.svelte';
	import { latestValueOf } from '$lib/MockDataSource';
	import { onMount } from 'svelte';
	import { Line } from 'svelte-chartjs';
	import 'chart.js/auto';

	const data = {
		labels: new Array(100).fill(''),
		datasets: [
			{
				label: 'My First dataset',
				data: new Array(100).fill(null).map(() => Math.random()),

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

	let heartRate, bodyTemperature, bloodOxygenLevel;
	onMount(() => {
		heartRate = latestValueOf('跳每分钟');
		bodyTemperature = latestValueOf('摄氏度');
		bloodOxygenLevel = latestValueOf('百分之');
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
			<Line {data} />
		</div>
		<span>Hb</span>
	</div>
	<div class="chart">
		<div>
			<Line {data} />
		</div>
		<span>HbO2</span>
	</div>
</section>

<style>
	section {
		margin-top: 2rem;
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
