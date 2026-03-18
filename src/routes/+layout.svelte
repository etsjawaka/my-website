<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>ione:forge</title>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if page.url.pathname === '/'}
	{@render children()}
{:else}
	<main class="subpage-shell" aria-label="Subpage">
		<a href={resolve('/')}>Mainpage</a>
	</main>
{/if}

<style>
	:global(:root) {
		--bg-color: #e8e8e5;
		--text-color: #8a795d;
		--accent: #8a795d;
		color-scheme: light;
	}

	:global(body) {
		margin: 0;
		background: var(--bg-color);
		color: var(--text-color);
		overflow-x: hidden;
	}

	:global(*) {
		box-sizing: border-box;
	}

	.subpage-shell {
		min-height: 100vh;
		display: grid;
		place-items: center;
		background: var(--bg-color);
	}

	.subpage-shell a {
		color: var(--text-color);
		font-size: 1.1rem;
		font-weight: 700;
		text-decoration: underline;
		text-underline-offset: 0.18em;
	}
</style>
