<script>
	import { SlidingWindowAggregation } from '$lib/Utility';
	import TopicDataStream from '$lib/AliCloudIotDataSource';
	import FormattedNumericReading from '$lib/FormattedNumericReading.svelte';
	import ExpandableHistoryReading from '$lib/ExpandableHistoryReading.svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-french-toast';
	import { derived } from 'svelte/store';

	let bodyTemperature, heartRate, bloodOxygenLevel;
	let Hb, HbO2;
	onMount(async () => {
		const iotStream = new TopicDataStream();
		const [streams, ok] = await iotStream.getStream();
		if (!ok) {
			toast.error('设备连接失败', { duration: 10 * 1000 });
		} else {
			[bodyTemperature, heartRate, bloodOxygenLevel] = streams;
			Hb = new SlidingWindowAggregation(derived(bloodOxygenLevel, (v) => v / 100));
			HbO2 = new SlidingWindowAggregation(derived(bloodOxygenLevel, (v) => 1 - v / 100));
		}
	});
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

	<ExpandableHistoryReading label="Hb" numberStream={Hb} />
	<ExpandableHistoryReading label="HbO2" numberStream={HbO2} />
</section>

<style>
	section {
		margin: 2rem 1rem 0 1rem;
		padding: 1rem;
		border: solid;
	}
</style>
