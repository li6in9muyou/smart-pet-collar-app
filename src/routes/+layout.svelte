<script>
	import './styles.css';
</script>

<div class="app">
	<main>
		<slot />
	</main>

	<footer>
		<p>
			built by <a href="blog.li6q.fun">li6in9muyou</a>
			with <a href="kit.svelte.dev">SvelteKit</a>
			and <a href="pockethost.io">PocketHost</a>
		</p>
	</footer>
</div>

<style>
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
