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

	// ET SAMU: selvrefererende_dings
	const samuVideoId = 'GZ8XnEZbCt8';

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
		<p class="lede">Videos from the smithy, the workshop and elsewhere.</p>
	</header>

	<section aria-live="polite">
		<h2 class="section-title">latest short · galaxiuschaos</h2>
		{#if loading}
			<p>loading latest short…</p>
		{:else if error}
			<p>
				{error}
				<a href="https://www.youtube.com/@galaxiuschaos/shorts" target="_blank" rel="noopener noreferrer"
					>See the shorts on YouTube &#8599;</a
				>
			</p>
		{:else if latestShort}
			<div class="video-shell short">
				<iframe
					src={latestShort.embedUrl}
					title="Latest YouTube short from galaxiuschaos"
					referrerpolicy="strict-origin-when-cross-origin"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			</div>
			<p class="watch">
				<a href={latestShort.watchUrl} target="_blank" rel="noopener noreferrer"
					>open on YouTube &#8599;</a
				>
			</p>
		{/if}
	</section>

	<section>
		<h2 class="section-title">selvrefererende_dings · ET SAMU</h2>
		<div class="video-shell wide">
			<iframe
				src="https://www.youtube-nocookie.com/embed/{samuVideoId}"
				title="selvrefererende_dings by ET SAMU"
				referrerpolicy="strict-origin-when-cross-origin"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
		<p class="watch">
			<a href="https://www.youtube.com/watch?v={samuVideoId}" target="_blank" rel="noopener noreferrer"
				>open on YouTube &#8599;</a
			>
		</p>
	</section>
</main>

<style>
	.video-shell {
		width: 100%;
		border: var(--line);
		background: #000;
	}

	/* shorts are portrait; keep them phone-sized on big screens */
	.video-shell.short {
		max-width: 380px;
		aspect-ratio: 9 / 16;
	}

	/* regular videos are landscape and use the full column width */
	.video-shell.wide {
		aspect-ratio: 16 / 9;
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

	@media (max-width: 560px) {
		/* on phones the short shouldn't be taller than the screen */
		.video-shell.short {
			max-width: min(100%, calc(70svh * 9 / 16));
		}
	}
</style>
