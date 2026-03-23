<script lang="ts">
	import { onMount } from 'svelte';
	import Reveal from '$lib/Reveal.svelte';

	let photos: string[] = [];
	let loading = true;
	let error = '';

	onMount(async () => {
		try {
			const res = await fetch('/api/photos');
			if (!res.ok) throw new Error('Failed to fetch photos.');
			photos = (await res.json()) as string[];
		} catch {
			error = 'Could not load photos right now.';
		} finally {
			loading = false;
		}
	});

	$: reel = photos.length ? [...photos, ...photos] : [];
</script>

<main aria-label="About page">
	<section class="about-panel">
		<Reveal>
			<h1>about</h1>
		</Reveal>

		{#if loading}
			<p class="status">Loading photos...</p>
		{:else if error}
			<p class="status">{error}</p>
		{:else if reel.length}
			<div class="reel-mask" aria-label="Photos reel">
				<div class="reel-track">
					{#each reel as src, i (`${src}-${i}`)}
						<figure class="reel-item">
							<img src={src} alt="Studio moment" loading="lazy" />
						</figure>
					{/each}
				</div>
			</div>
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
		padding: 4.5rem 0 2rem;
	}

	.about-panel {
		display: grid;
		align-content: start;
		gap: 1rem;
	}

	h1 {
		margin: 0;
		padding: 0 1rem;
		font-size: clamp(1.35rem, 3vw, 1.95rem);
		letter-spacing: 0.04em;
		text-transform: lowercase;
	}

	.status {
		margin: 0;
		padding: 0 1rem;
		font-size: 0.96rem;
	}

	.reel-mask {
		width: 100vw;
		overflow: hidden;
	}

	.reel-track {
		display: flex;
		gap: 0.7rem;
		width: max-content;
		padding: 0 1rem;
		animation: reel-scroll 42s linear infinite;
	}

	.reel-item {
		margin: 0;
		width: clamp(180px, 22vw, 320px);
		aspect-ratio: 4 / 5;
		border-radius: 14px;
		overflow: hidden;
		border: 1px solid rgba(117, 98, 68, 0.35);
		background: rgba(255, 255, 255, 0.42);
		box-shadow: 0 10px 22px rgba(44, 37, 25, 0.1);
	}

	.reel-item img {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: cover;
	}

	@keyframes reel-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@media (max-width: 680px) {
		main {
			padding-top: 1.6rem;
			gap: 1.25rem;
		}

		.reel-track {
			gap: 0.5rem;
			animation-duration: 34s;
		}
	}
</style>
