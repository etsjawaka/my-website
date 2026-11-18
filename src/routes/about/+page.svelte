<script lang="ts">
	import { onMount } from 'svelte';

	let photos: string[] = [];
	let loading = true;
	let error = '';
	let current = 0;

	onMount(async () => {
		try {
			const res = await fetch(`/api/photos?v=${Date.now()}`, { cache: 'no-store' });
			if (!res.ok) throw new Error('Failed to fetch photos.');
			photos = (await res.json()) as string[];
		} catch {
			error = 'Could not load photos right now.';
		} finally {
			loading = false;
		}
	});

	function prev() {
		if (photos.length) current = (current - 1 + photos.length) % photos.length;
	}
	function next() {
		if (photos.length) current = (current + 1) % photos.length;
	}
</script>

<svelte:head>
	<title>about · ione</title>
</svelte:head>

<main class="page" aria-label="About page">
	<header>
		<h1 class="page-title">about</h1>
	</header>

	<section class="intro">
		<div class="text">
			<p class="lede">
				I'm Espen Tangen Samuelsen, an artist, blacksmith and climbing wall builder based in
				Sandve on Karmøy.
			</p>
			<p>
				I trained in metal art and digital form at the Oslo National Academy of the Arts (KHiO), and
				I have spent more than 25 years in climbing: setting routes for national and international
				competitions, coaching, and building climbing walls across Norway.
			</p>
			<p>
				In the barn I have a smithy, a CNC machine and a 3D printer. Through my company Tangen Tang I
				take on art commissions, metalwork, handforged tools, and the building, inspection and repair
				of climbing walls.
			</p>

			<ul class="links">
				<li><a href="/art">art</a></li>
				<li><a href="/climbing">climbing</a></li>
				<li><a href="/art-cv">cv</a></li>
				<li><a href="/products">products</a></li>
				<li><a href="/blog">blog</a></li>
			</ul>
		</div>

		<div class="photo-frame" class:empty={loading || !!error || !photos.length}>
			{#if loading}
				<p class="status">loading…</p>
			{:else if error}
				<p class="status">{error}</p>
			{:else if photos.length}
				<img src={photos[current]} alt="From the studio and smithy" />
				{#if photos.length > 1}
					<button class="nav prev" on:click={prev} aria-label="Previous photo">&#8249;</button>
					<button class="nav next" on:click={next} aria-label="Next photo">&#8250;</button>
					<p class="counter">{current + 1} / {photos.length}</p>
				{/if}
			{:else}
				<p class="status">No photos yet.</p>
			{/if}
		</div>
	</section>
</main>

<style>
	.intro {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: 2.5rem;
		align-items: start;
	}

	.text p {
		margin: 0 0 1rem;
		max-width: 60ch;
	}

	.links {
		list-style: none;
		margin: 1.5rem 0 0;
		padding: 1rem 0 0;
		border-top: var(--line);
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.4rem;
	}

	.links li::before {
		content: '> ';
		color: var(--ink-soft);
	}

	.photo-frame {
		position: relative;
		width: 100%;
		aspect-ratio: 4 / 5;
		border: var(--line);
		background: #f4f4f4;
		overflow: hidden;
	}

	.photo-frame.empty {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.photo-frame img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
		filter: grayscale(0.15);
	}

	.status {
		margin: 0;
	}

	.nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 2.4rem;
		height: 2.4rem;
		padding: 0;
		border: var(--line);
		background: var(--paper);
		color: var(--ink);
		font-size: 1.5rem;
		line-height: 1;
		cursor: pointer;
	}

	.nav:hover,
	.nav:focus-visible {
		background: var(--ink);
		color: var(--paper);
	}

	.nav.prev {
		left: 0.6rem;
	}

	.nav.next {
		right: 0.6rem;
	}

	.counter {
		position: absolute;
		right: 0.6rem;
		bottom: 0.5rem;
		margin: 0;
		padding: 0.1rem 0.45rem;
		background: var(--paper);
		border: var(--line);
		font-size: 0.8rem;
	}

	@media (max-width: 760px) {
		.intro {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}
</style>
