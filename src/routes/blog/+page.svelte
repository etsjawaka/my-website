<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';

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

<main aria-label="Blog page">
	<a class="home-link" href={resolve('/')}>Mainpage</a>

	<section class="blog-panel" aria-live="polite">
		<h1>blog</h1>

		{#if loading}
			<p class="status">Loading latest short...</p>
		{:else if error}
			<p class="status">{error}</p>
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
			<a class="watch-link" href={latestShort.watchUrl} target="_blank" rel="noreferrer">
				Open on YouTube
			</a>
		{/if}
	</section>
</main>

<style>
	main {
		min-height: 100vh;
		background: var(--bg-color, #e8e8e5);
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 2rem;
		padding: 2.25rem 1rem 2rem;
	}

	.home-link {
		color: var(--text-color, #8a795d);
		font-size: 1rem;
		font-weight: 700;
		text-decoration: underline;
		text-underline-offset: 0.18em;
		justify-self: center;
	}

	.blog-panel {
		width: min(860px, 100%);
		justify-self: center;
		display: grid;
		gap: 0.9rem;
		padding: 1.2rem;
		border: 1px solid rgba(117, 98, 68, 0.35);
		border-radius: 18px;
		background: rgba(255, 255, 255, 0.45);
		box-shadow: 0 10px 24px rgba(44, 37, 25, 0.08);
	}

	h1 {
		margin: 0;
		font-size: clamp(1.35rem, 3vw, 1.95rem);
		letter-spacing: 0.04em;
		text-transform: lowercase;
	}

	.status {
		margin: 0;
		font-size: 0.96rem;
	}

	.video-shell {
		position: relative;
		width: min(420px, 100%);
		aspect-ratio: 9 / 16;
		border-radius: 14px;
		overflow: hidden;
		border: 1px solid rgba(117, 98, 68, 0.35);
		background: #000;
	}

	.video-shell iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	.watch-link {
		color: var(--text-color, #8a795d);
		font-weight: 700;
		text-decoration: underline;
		text-underline-offset: 0.18em;
		width: fit-content;
	}

	@media (max-width: 680px) {
		main {
			padding-top: 1.6rem;
			gap: 1.25rem;
		}

		.blog-panel {
			padding: 0.95rem;
		}

		.video-shell {
			width: min(360px, 100%);
		}
	}
</style>
