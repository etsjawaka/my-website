<script lang="ts">
	import { onMount } from 'svelte';

	type LatestShort = {
		videoId: string;
		embedUrl: string;
		watchUrl: string;
	};

	let latestShort: LatestShort | null = null;
	let loading = true;
	let error = '';

	onMount(async () => {
		try {
			const res = await fetch('/api/latest-short');
			if (!res.ok) throw new Error('Failed to fetch latest short.');
			latestShort = (await res.json()) as LatestShort;
		} catch {
			error = 'Could not load latest short right now.';
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>blog · ione</title>
</svelte:head>

<main class="page" aria-label="Blog page">
	<header>
		<h1 class="page-title">blog</h1>
		<p class="lede">The latest short from the smithy and the workshop.</p>
	</header>

	<section aria-live="polite">
		<h2 class="section-title">latest short</h2>
		{#if loading}
			<p>loading latest short…</p>
		{:else if error}
			<p>{error}</p>
		{:else if latestShort}
			<div class="video-shell">
				<iframe
					src={latestShort.embedUrl}
					title="Latest YouTube short"
					loading="lazy"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
				></iframe>
			</div>
			<p class="watch">
				<a href={latestShort.watchUrl} target="_blank" rel="noreferrer">open on YouTube →</a>
			</p>
		{/if}
	</section>
</main>

<style>
	.video-shell {
		width: min(380px, 100%);
		aspect-ratio: 9 / 16;
		border: var(--line);
		background: #000;
	}

	.video-shell iframe {
		width: 100%;
		height: 100%;
		border: 0;
		display: block;
	}

	.watch {
		margin: 0.8rem 0 0;
	}
</style>
