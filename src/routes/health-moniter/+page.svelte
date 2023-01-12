<script>
	import BackToHome from '$lib/BackToHome.svelte';
	import FormattedNumericReading from '$lib/FormattedNumericReading.svelte';
	import { latestValueOf } from '$lib/PocketBaseAdapter.js';

	const heartRate = latestValueOf('跳每分钟');
	const bodyTemperature = latestValueOf('摄氏度');
	const bloodOxygenLevel = latestValueOf('百分之');
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
