<script lang="ts">
</script>

<main aria-label="Art page">
	<section class="page-panel">
		<h1>art</h1>
		<p>Explorations in metal, form, and digital fabrication.</p>
		<div class="card-grid">
			<article class="card">
				<h2>practice</h2>
				<p>Objects, surfaces, and sculptural work shaped through material experiments.</p>
			</article>
			<article class="card">
				<h2>process</h2>
				<p>From hand-made studies to CAD-based refinement and fabrication.</p>
			</article>
		</div>
		<p class="back-link"><a href="/about">Back to about</a></p>
	</section>
</main>

<style>
	main {
		min-height: 100vh;
		background: var(--bg-color, #e8e8e5);
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 1.5rem;
		padding: clamp(4.8rem, 8vw, 5.8rem) 1rem 2rem;
	}

	.page-panel {
		width: min(920px, 100%);
		justify-self: center;
		display: grid;
		gap: 0.9rem;
		padding: clamp(1rem, 2.8vw, 1.35rem);
		border: 1px solid rgba(117, 98, 68, 0.35);
		border-radius: 18px;
		background: rgba(255, 255, 255, 0.45);
		box-shadow: 0 10px 24px rgba(44, 37, 25, 0.08);
	}

	h1 {
		margin: 0;
		font-size: clamp(1.35rem, 3vw, 1.95rem);
		font-weight: 600;
		letter-spacing: 0.02em;
		text-transform: lowercase;
		color: rgba(88, 73, 46, 0.96);
	}

	p {
		margin: 0;
		line-height: 1.5;
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.8rem;
	}

	.card {
		padding: 0.8rem;
		border-radius: 12px;
		border: 1px solid rgba(117, 98, 68, 0.25);
		background: rgba(248, 246, 241, 0.7);
	}

	h2 {
		margin: 0 0 0.45rem;
		font-size: 0.95rem;
		text-transform: lowercase;
		letter-spacing: 0.02em;
	}

	.back-link {
		padding-top: 0.3rem;
	}

	a {
		color: rgba(88, 73, 46, 0.96);
	}

	@media (max-width: 640px) {
		.card-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
