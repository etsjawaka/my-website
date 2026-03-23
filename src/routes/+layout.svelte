<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';

	let { children } = $props();
</script>

<svelte:head>
	<title>ione:forge</title>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content="#f7f4ee" />
	<meta name="color-scheme" content="light" />
</svelte:head>

{#if $page.url.pathname !== '/'}
	<a class="home-panel" href="/">
		<span class="home-term-line">mainpage</span>
	</a>
{/if}

{@render children()}

<style>
	:global(:root) {
		--bg-color: #faf8f3;
		--text-color: #8a795d;
		--accent: #8a795d;
		color-scheme: light;
	}

	:global(html) {
		background: #fffefb;
		color-scheme: light;
	}

	:global(body) {
		margin: 0;
		background:
			radial-gradient(circle at top, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0) 46%),
			var(--bg-color);
		color: var(--text-color);
		overflow-x: hidden;
		color-scheme: light;
	}

	:global(*) {
		box-sizing: border-box;
	}

	.home-panel {
		position: fixed;
		top: 1.25rem;
		left: 1.5rem;
		z-index: 100;
		padding: 0.85rem 0.95rem;
		border: 1px solid rgba(255, 255, 255, 0.34);
		background: rgba(244, 239, 230, 0.54);
		backdrop-filter: blur(2px);
		box-shadow: 0 10px 26px rgba(108, 95, 73, 0.12);
		border-radius: 8px;
		text-decoration: none;
		display: block;
	}

	.home-term-line {
		font-family: 'Courier New', Courier, monospace;
		font-size: clamp(0.95rem, 2.5vw, 1.2rem);
		font-weight: 600;
		color: rgba(88, 73, 46, 0.96);
		letter-spacing: 0.02em;
		line-height: 1.35;
		user-select: none;
	}

	@media (max-width: 680px) {
		.home-panel {
			left: 1rem;
			top: calc(0.85rem + env(safe-area-inset-top, 0px));
			padding: 0.78rem 0.88rem;
			background: rgba(248, 244, 236, 0.72);
			border-color: rgba(177, 161, 131, 0.36);
		}

		.home-term-line {
			font-size: 1rem;
			color: rgba(87, 73, 50, 0.98);
		}
	}

</style>
