<script>
	import { latestValueOf } from '$lib/MockDataSource';
	import { SlidingWindowAggregation } from '$lib/Utility';
	import TopicDataStream from '$lib/AliCloudIotDataSource';
	import FormattedNumericReading from '$lib/FormattedNumericReading.svelte';
	import ExpandableHistoryReading from '$lib/ExpandableHistoryReading.svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-french-toast';

	const heartRate = latestValueOf('跳每分钟');

	let bodyTemperature, ok;
	onMount(async () => {
		const iotStream = new TopicDataStream();
		[bodyTemperature, ok] = await iotStream.getStream();
		if (!ok) {
			toast.error('设备连接失败', { duration: 10 * 1000 });
		}
	});
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
	<FormattedNumericReading
		label="心率"
		numberStream={heartRate}
		decimalPlaces="0"
		unit="下每分钟"
	/>
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
