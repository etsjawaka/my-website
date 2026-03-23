<script lang="ts">
</script>

<main aria-label="Products page">
	<section class="page-panel">
		<h1>products</h1>
		<p>
			Populate this area with your catalog, pricing, release notes, and external shop links.
		</p>

		<div class="product-grid">
			<article class="product-card">
				<h2>piece title</h2>
				<p>Material, dimensions, year.</p>
				<span class="placeholder-link">View details</span>
			</article>
			<article class="product-card">
				<h2>piece title</h2>
				<p>Material, dimensions, year.</p>
				<span class="placeholder-link">View details</span>
			</article>
			<article class="product-card">
				<h2>piece title</h2>
				<p>Material, dimensions, year.</p>
				<span class="placeholder-link">View details</span>
			</article>
		</div>
	</section>
</main>

<style>
	main {
		min-height: 100vh;
		background: var(--bg-color, #e8e8e5);
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 2rem;
		padding: 4.5rem 1rem 2rem;
	}

	.page-panel {
		width: min(980px, 100%);
		justify-self: center;
		display: grid;
		gap: 1rem;
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

	p {
		margin: 0;
		line-height: 1.5;
	}

	.product-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.8rem;
	}

	.product-card {
		padding: 0.85rem;
		border-radius: 12px;
		border: 1px solid rgba(117, 98, 68, 0.25);
		background: rgba(248, 246, 241, 0.72);
		display: grid;
		gap: 0.35rem;
	}

	h2 {
		margin: 0;
		font-size: 0.95rem;
		text-transform: lowercase;
		letter-spacing: 0.02em;
	}

	.placeholder-link {
		width: fit-content;
		color: var(--text-color, #8a795d);
		font-weight: 700;
		text-decoration: underline;
		text-underline-offset: 0.18em;
	}

	@media (max-width: 900px) {
		.product-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 760px) {
		main {
			padding-top: 1.6rem;
			gap: 1.25rem;
		}

		.page-panel {
			padding: 0.95rem;
		}

		.product-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
