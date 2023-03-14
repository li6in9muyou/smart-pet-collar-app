<script>
	import './styles.css';
	import BackToHome from '$lib/BackToHome.svelte';
</script>

<div class="app">
	<header>
		<BackToHome />
		<h1>智能宠物项圈APP</h1>
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<p>
			built by <a href="https://blog.li6q.fun">li6in9muyou</a>
			with <a href="https://kit.svelte.dev">SvelteKit</a>
		</p>
	</footer>
</div>

<style>
	header {
		display: flex;
		align-items: center;
	}

	header > h1 {
		margin: auto;
	}

	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
