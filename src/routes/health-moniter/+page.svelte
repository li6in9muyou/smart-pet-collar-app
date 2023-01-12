<script>
	import BackToHome from '$lib/BackToHome.svelte';
	import FormattedNumericReading from '$lib/FormattedNumericReading.svelte';
	import { latestValueOf } from '$lib/PocketBaseAdapter.js';
	import { onMount } from 'svelte';

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
</section>

<style>
	section {
		margin-top: 2rem;
		padding: 1rem;
		border: solid;
	}
</style>
