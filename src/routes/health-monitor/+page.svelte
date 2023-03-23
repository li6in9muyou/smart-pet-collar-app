<script>
	import { latestValueOf } from '$lib/MockDataSource';
	import { SlidingWindowAggregation } from '$lib/Utility.js';
	import FormattedNumericReading from '$lib/FormattedNumericReading.svelte';
	import ExpandableHistoryReading from '$lib/ExpandableHistoryReading.svelte';

	const heartRate = latestValueOf('跳每分钟');
	const bodyTemperature = latestValueOf('摄氏度');
	const bloodOxygenLevel = latestValueOf('百分之');

	const heartRateWindow = new SlidingWindowAggregation(heartRate);
	const bloodOxygenLevelWindow = new SlidingWindowAggregation(bloodOxygenLevel);
</script>

<svelte:head>
	<title>健康检测</title>
	<meta name="description" content="健康检测" />
</svelte:head>

<section>
	<FormattedNumericReading label="体温" numberStream={bodyTemperature} unit="℃" />
	<FormattedNumericReading label="心率" numberStream={heartRate} />
	<FormattedNumericReading label="血氧" numberStream={bloodOxygenLevel} unit="%" />

	<ExpandableHistoryReading label="Hb" numberStream={heartRateWindow} />
	<ExpandableHistoryReading label="HbO2" numberStream={bloodOxygenLevelWindow} />
</section>

<style>
	section {
		margin: 2rem 1rem 0 1rem;
		padding: 1rem;
		border: solid;
	}
</style>
