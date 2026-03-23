<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>ione:forge</title>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content="#f7f4ee" />
</svelte:head>

{@render children()}

<style>
	:global(:root) {
		--bg-color: #f4f1ea;
		--text-color: #8a795d;
		--accent: #8a795d;
		color-scheme: light;
	}

	:global(body) {
		margin: 0;
		background:
			radial-gradient(circle at top, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0) 38%),
			var(--bg-color);
		color: var(--text-color);
		overflow-x: hidden;
	}

	:global(*) {
		box-sizing: border-box;
	}

</style>
