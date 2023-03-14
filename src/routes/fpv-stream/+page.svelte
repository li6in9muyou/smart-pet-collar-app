<script>
	export let data;
	const imgSrc = data.imgSrc;
</script>

<svelte:head>
	<title>摄相头</title>
</svelte:head>

<section>
	<img src={$imgSrc} alt="" />
</section>

<style>
	section {
		padding: 8px;
		margin-top: 20px;

		text-align: center;
	}
</style>
