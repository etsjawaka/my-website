<script lang="ts">
</script>

<main aria-label="CV page">
	<section class="page-panel">
		<h1>cv</h1>
		<p>
			Use this section for your artistic statement and an overview of practice, exhibitions,
			commissions, and education.
		</p>

		<div class="timeline">
			<article class="entry">
				<h2>selected exhibitions</h2>
				<p>2026 - exhibition title, venue</p>
			</article>
			<article class="entry">
				<h2>education</h2>
				<p>Year - school or program</p>
			</article>
			<article class="entry">
				<h2>collaborations</h2>
				<p>Year - project and partners</p>
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
		width: min(920px, 100%);
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

	.timeline {
		display: grid;
		gap: 0.75rem;
	}

	.entry {
		padding: 0.85rem;
		border-radius: 12px;
		border: 1px solid rgba(117, 98, 68, 0.25);
		background: rgba(248, 246, 241, 0.72);
	}

	h2 {
		margin: 0 0 0.3rem;
		font-size: 0.95rem;
		text-transform: lowercase;
		letter-spacing: 0.02em;
	}

	@media (max-width: 760px) {
		main {
			padding-top: 1.6rem;
			gap: 1.25rem;
		}

		.page-panel {
			padding: 0.95rem;
		}
	}
</style>
