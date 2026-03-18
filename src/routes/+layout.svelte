<script lang="ts">
	import { page } from '$app/stores';
	import favicon from '$lib/assets/favicon.svg';
	import PlanetNavigation from '$lib/planet/PlanetNavigation.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>ione:forge</title>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if $page.url.pathname === '/'}
	<PlanetNavigation />
{:else}
	{@render children()}
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

</style>
