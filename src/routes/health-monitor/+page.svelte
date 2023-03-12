<script>
	import BackToHome from '$lib/BackToHome.svelte';
	import FormattedNumericReading from '$lib/FormattedNumericReading.svelte';
	import { latestValueOf, windowOf } from '$lib/MockDataSource';
	import ExpandableHistoryReading from '$lib/ExpandableHistoryReading.svelte';

	const heartRate = latestValueOf('跳每分钟');
	const bodyTemperature = latestValueOf('摄氏度');
	const bloodOxygenLevel = latestValueOf('百分之');

	const heartRateWindow = windowOf('跳每分钟');
	const bloodOxygenLevelWindow = windowOf('百分之');
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

	<ExpandableHistoryReading label="Hb" data={heartRateWindow} />
	<ExpandableHistoryReading label="HbO2" data={bloodOxygenLevelWindow} />
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
