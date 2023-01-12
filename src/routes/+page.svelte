<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<h1>智能宠物项圈APP</h1>

<section>
	<div class="btn-lg text-lg">
		<a href="/health-moniter">健康检测</a>
	</div>
	<div class="btn-lg text-lg">
		<a href="/fpv-stream">摄相头</a>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2rem;

		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	a {
		color: unset;
	}

	.btn-lg {
		border: solid;
		padding: 1rem;
		cursor: pointer;
	}

	.text-lg {
		font-size: 3rem;
	}
</style>
