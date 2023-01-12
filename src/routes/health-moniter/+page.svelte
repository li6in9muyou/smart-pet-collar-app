<script>
	import BackToHome from '$lib/BackToHome.svelte';
	import FormattedNumericReading from '$lib/FormattedNumericReading.svelte';
</script>

<svelte:head>
	<title>健康检测</title>
	<meta name="description" content="健康检测" />
</svelte:head>

<BackToHome />

<section>
	<FormattedNumericReading label="体温" value="36.3" unit="℃" />
	<FormattedNumericReading label="心率" value="83" />
	<FormattedNumericReading label="血氧" value="97.5" unit="%" />
</section>

<style>
	section {
		margin-top: 2rem;
		padding: 1rem;
		border: solid;
	}
</style>
