<script lang="ts">
	import { onMount } from 'svelte';

	let photos: string[] = [];
	let loading = true;
	let error = '';
	let current = 0;

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

	function prev() {
		if (photos.length) current = (current - 1 + photos.length) % photos.length;
	}
	function next() {
		if (photos.length) current = (current + 1) % photos.length;
	}
</script>

<main aria-label="About page">
	<section class="content-row">
		<div class="text-box">
			<h1>about</h1>
			<ul class="services">
				<li>Handforged tools made on demand</li>
				<li>Metalwork</li>
				<li>Tools repair</li>
				<li>Metalart</li>
				<li>3D drawing</li>
				<li>CNC CAD</li>
				<li>3D print</li>
			</ul>
		</div>

		<div class="photo-frame-wrap">
			{#if loading}
				<div class="photo-frame empty"><p class="status">Loading...</p></div>
			{:else if error}
				<div class="photo-frame empty"><p class="status">{error}</p></div>
			{:else if photos.length}
				<div class="photo-frame">
					<img src={photos[current]} alt="Studio moment" />
					{#if photos.length > 1}
						<button class="nav prev" on:click={prev} aria-label="Previous photo">&#8249;</button>
						<button class="nav next" on:click={next} aria-label="Next photo">&#8250;</button>
						<div class="dots">
							{#each photos as _, i}
								<button
									class="dot{i === current ? ' active' : ''}"
									on:click={() => { current = i; }}
									aria-label="Photo {i + 1}"
								></button>
							{/each}
						</div>
					{/if}
				</div>
			{:else}
				<div class="photo-frame empty"><p class="status">No photos yet.</p></div>
			{/if}
		</div>
	</section>
</main>

<style>
	main {
		min-height: 100vh;
		background: var(--bg-color, #e8e8e5);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5rem 1.5rem 2rem;
	}

	.content-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2.5rem;
		align-items: center;
		width: min(900px, 100%);
	}

	.text-box {
		padding: 2rem 2rem;
		background: rgba(255, 255, 255, 0.45);
		border: 1px solid rgba(117, 98, 68, 0.28);
		border-radius: 16px;
		box-shadow: 0 10px 26px rgba(44, 37, 25, 0.08);
		display: grid;
		gap: 1.25rem;
	}

	h1 {
		margin: 0;
		font-size: clamp(1.35rem, 3vw, 1.95rem);
		letter-spacing: 0.04em;
		text-transform: lowercase;
		color: #655844;
	}

	.services {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.7rem;
	}

	.services li {
		font-family: 'Courier New', Courier, monospace;
		font-size: clamp(0.95rem, 2vw, 1.1rem);
		font-weight: 600;
		color: rgba(88, 73, 46, 0.92);
		letter-spacing: 0.02em;
		padding-left: 1.1em;
		position: relative;
	}

	.services li::before {
		content: '>';
		position: absolute;
		left: 0;
		color: rgba(88, 73, 46, 0.5);
	}

	.photo-frame-wrap {
		display: flex;
		justify-content: center;
	}

	.photo-frame {
		position: relative;
		width: 100%;
		max-width: 380px;
		aspect-ratio: 4 / 5;
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid rgba(117, 98, 68, 0.35);
		background: rgba(255, 255, 255, 0.42);
		box-shadow: 0 14px 32px rgba(44, 37, 25, 0.14);
	}

	.photo-frame img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.photo-frame.empty {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.status {
		margin: 0;
		font-size: 0.96rem;
	}

	.nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(244, 239, 230, 0.72);
		border: 1px solid rgba(177, 161, 131, 0.4);
		border-radius: 50%;
		width: 2.2rem;
		height: 2.2rem;
		font-size: 1.5rem;
		line-height: 1;
		color: rgba(88, 73, 46, 0.9);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		backdrop-filter: blur(2px);
		transition: background 0.2s;
	}

	.nav:hover {
		background: rgba(244, 239, 230, 0.95);
	}

	.nav.prev { left: 0.6rem; }
	.nav.next { right: 0.6rem; }

	.dots {
		position: absolute;
		bottom: 0.7rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 0.4rem;
	}

	.dot {
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.55);
		border: 1px solid rgba(117, 98, 68, 0.4);
		cursor: pointer;
		padding: 0;
		transition: background 0.2s;
	}

	.dot.active {
		background: rgba(88, 73, 46, 0.85);
	}

	@media (max-width: 680px) {
		main {
			padding: 5rem 1rem 2rem;
			align-items: start;
		}

		.content-row {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.photo-frame {
			max-width: 100%;
		}
	}
</style>
