<script>
	import { toast } from 'svelte-french-toast';

	export let data;
	const imgSrc = data.imgSrc;
</script>

<svelte:head>
	<title>摄相头</title>
</svelte:head>

<section>
	<img src={$imgSrc} alt="" on:error={() => toast.error('图片不能加载')} />
</section>

<style>
	section {
		padding: 8px;
		margin-top: 20px;

		text-align: center;
	}
</style>
