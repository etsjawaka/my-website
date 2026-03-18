<script lang="ts">
	import { onMount } from 'svelte';
	import blogEntries from '$lib/blog.json';

	type Photo = {
		src: string;
		caption: string;
	};

	type BlogEntry = {
		id: number;
		title: string;
		date: string;
		content: string;
	};

	let photos: Photo[] = [];
	let current = 0;
	let intervalId: ReturnType<typeof setInterval> | null = null;
	let autoplayDelay = 3500;
	let reelHeight = 380;
	let lightboxOpen = false;
	let lightboxIndex = 0;

	const blogPosts = blogEntries as BlogEntry[];

	function formatCaption(filename: string) {
		return filename
			.replace(/\.[^.]+$/, '')
			.replace(/[-_]/g, ' ')
			.replace(/\b\w/g, (character: string) => character.toUpperCase());
	}

	function startAutoplay() {
		if (intervalId || photos.length <= 1 || lightboxOpen) return;
		intervalId = setInterval(() => {
			current = (current + 1) % photos.length;
		}, autoplayDelay);
	}

	function stopAutoplay() {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
	}

	function prev() {
		if (photos.length) current = (current - 1 + photos.length) % photos.length;
	}

	function next() {
		if (photos.length) current = (current + 1) % photos.length;
	}

	function openLightbox(index: number) {
		lightboxIndex = index;
		lightboxOpen = true;
		stopAutoplay();
	}

	function closeLightbox() {
		lightboxOpen = false;
		if (photos.length > 1) startAutoplay();
	}

	function handleLightboxKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			closeLightbox();
		}
	}

	onMount(() => {
		const init = async () => {
			try {
				const response = await fetch('/api/photos');
				const list = (await response.json()) as string[];
				photos = Array.isArray(list)
					? list.map((src: string) => ({
							src,
							caption: formatCaption(src.split('/').pop() || '')
						}))
					: [];
				startAutoplay();
			} catch {
				photos = [];
			}
		};

		function onKey(event: KeyboardEvent) {
			if (!lightboxOpen) return;
			if (event.key === 'Escape') closeLightbox();
			if (event.key === 'ArrowLeft') prev();
			if (event.key === 'ArrowRight') next();
		}

		init();
		window.addEventListener('keydown', onKey);

		return () => {
			stopAutoplay();
			window.removeEventListener('keydown', onKey);
		};
	});
</script>

<main>
	<section class="hero-card">
		<p class="eyebrow">About</p>
		<h1>Forge work, image studies and objects in one place.</h1>
		<p class="lede">
			This page now carries the image reel, a short studio statement and the blog box so the planet
			home page can stay focused on navigation.
		</p>
	</section>

	<section class="content-grid">
		<section class="panel reel-panel">
			<div class="panel-header">
				<h2>Image Reel</h2>
				<p>Material studies, product tests and process fragments.</p>
			</div>

			{#if photos.length === 0}
				<div class="viewport empty-state">Add images to /static/photos to populate the reel.</div>
			{:else}
				<div
					class="viewport"
					role="region"
					aria-label="Photo reel"
					aria-live="polite"
					on:mouseenter={stopAutoplay}
					on:mouseleave={() => {
						if (!lightboxOpen) startAutoplay();
					}}
					style="--reel-height: {reelHeight}px;"
				>
					<div class="slides" style="transform: translateX(-{current * 100}%);">
						{#each photos as photo, index (photo.src)}
							<div class="slide">
								<button
									class="slide-button"
									type="button"
									on:click={() => openLightbox(index)}
									aria-label={`Open photo ${index + 1} in lightbox`}
								>
									<img src={photo.src} alt={photo.caption} loading="lazy" />
								</button>
							</div>
						{/each}
					</div>
				</div>

				<div class="controls">
					<button on:click={prev} aria-label="Previous image">◀</button>
					<button on:click={next} aria-label="Next image">▶</button>
				</div>
			{/if}

			{#if lightboxOpen}
				<div
					class="lightbox"
					role="dialog"
					aria-modal="true"
					tabindex="0"
					on:click={closeLightbox}
					on:keydown={handleLightboxKeydown}
				>
					<img src={photos[lightboxIndex].src} alt={photos[lightboxIndex].caption} />
				</div>
			{/if}
		</section>

		<section class="panel text-panel">
			<div class="panel-header">
				<h2>Studio Text</h2>
			</div>

			<p>
				Ione:forge moves between forged objects, sculptural forms, small production pieces and
				image-based documentation. The site is arranged like a small system of orbiting rooms so the
				work can be approached through material, process and finished objects.
			</p>

			<p>
				The about section is where ongoing notes, visual references and short written context sit
				together. It is meant to feel more like a worktable than a brochure page.
			</p>

			<p>
				As you refine the 3D planet, you can update this copy, expand the blog entries and replace
				the temporary CV/contact text with your final material.
			</p>
		</section>

		<aside class="panel blog-panel">
			<div class="panel-header">
				<h2>Blog Box</h2>
				<p>Short notes and recent updates.</p>
			</div>

			{#if blogPosts.length === 0}
				<p class="blog-empty">No blog entries yet.</p>
			{:else}
				<div class="blog-list">
					{#each blogPosts as entry (`${entry.date}-${entry.title}`)}
						<article class="blog-entry">
							<p class="blog-date">{entry.date}</p>
							<h3>{entry.title}</h3>
							<p>{entry.content}</p>
						</article>
					{/each}
				</div>
			{/if}
		</aside>
	</section>
</main>

<style>
	main {
		background: var(--bg-color, #dedad0);
		color: var(--text-color, #8a795d);
		min-height: calc(100vh - 77px);
		padding: clamp(1rem, 2.8vw, 2rem);
		font-family: sans-serif;
	}

	.hero-card {
		max-width: 860px;
		margin: 0 auto 1.5rem;
		padding: clamp(1.5rem, 3vw, 2.5rem);
		border: 1px solid #b7b2a6;
		border-radius: 18px;
		background: linear-gradient(145deg, #eee8db 0%, #e4ddd0 100%);
	}

	.eyebrow {
		margin: 0 0 0.5rem;
		font-size: 0.85rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	h1 {
		margin: 0;
		font-size: clamp(2rem, 4vw, 3.6rem);
		line-height: 0.98;
		color: #655844;
	}

	.lede {
		margin: 1rem 0 0;
		max-width: 58ch;
		font-size: 1.03rem;
		line-height: 1.6;
	}

	.content-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.95fr) minmax(280px, 0.9fr);
		gap: 1rem;
		align-items: start;
	}

	.panel {
		border: 1px solid #b7b2a6;
		border-radius: 18px;
		background: #ece6d9;
		padding: 1rem;
		box-shadow: 0 14px 32px rgba(98, 84, 56, 0.08);
	}

	.panel-header h2 {
		margin: 0;
		color: #655844;
	}

	.panel-header p {
		margin: 0.35rem 0 1rem;
		font-size: 0.95rem;
	}

	.viewport {
		width: 100%;
		height: var(--reel-height, 380px);
		overflow: hidden;
		border-radius: 12px;
		border: 1px solid #c1b7a5;
		background: #d8d1c5;
	}

	.empty-state {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		text-align: center;
	}

	.slides {
		display: flex;
		transition: transform 0.5s ease;
		height: 100%;
	}

	.slide {
		min-width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.slide img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		display: block;
	}

	.slide-button {
		appearance: none;
		background: transparent;
		border: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		cursor: zoom-in;
	}

	.controls {
		margin-top: 0.65rem;
		display: flex;
		gap: 0.5rem;
		justify-content: center;
	}

	.controls button {
		background: transparent;
		color: var(--text-color, #8a795d);
		border: 0;
		padding: 0.25rem 0.5rem;
		cursor: pointer;
		min-width: 0;
		font-size: 1.4rem;
		line-height: 1;
		font-weight: 700;
	}

	.controls button:hover {
		opacity: 0.7;
	}

	.text-panel p {
		margin: 0 0 1rem;
		line-height: 1.65;
	}

	.text-panel p:last-child {
		margin-bottom: 0;
	}

	.blog-list {
		display: grid;
		gap: 0.9rem;
	}

	.blog-entry {
		border-top: 1px solid #c2b7a6;
		padding-top: 0.9rem;
	}

	.blog-entry:first-child {
		border-top: 0;
		padding-top: 0;
	}

	.blog-date {
		margin: 0 0 0.35rem;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.blog-entry h3 {
		margin: 0 0 0.4rem;
		font-size: 1.1rem;
		color: #655844;
	}

	.blog-entry p {
		margin: 0;
		line-height: 1.55;
	}

	.blog-empty {
		margin: 0;
	}

	.lightbox {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.85);
		z-index: 9999;
	}

	.lightbox img {
		max-width: 90%;
		max-height: 90%;
		object-fit: contain;
		border: 2px solid #222;
		border-radius: 6px;
	}

	@media (max-width: 1120px) {
		.content-grid {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		}

		.blog-panel {
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 760px) {
		.content-grid {
			grid-template-columns: 1fr;
		}

		.viewport {
			height: min(76vw, 360px);
		}
	}
</style>
