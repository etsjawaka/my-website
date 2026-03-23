<script lang="ts">
</script>

<main aria-label="Contact page">
	<section class="page-panel">
		<h1>contact</h1>

		<div class="card-grid">
			<article class="card">
				<h2>email</h2>
				<p>post@ione.no</p>
			</article>
			<article class="card">
				<h2>social</h2>
				<p>@galaxiuschaos</p>
			</article>
			<article class="card">
				<h2>location</h2>
				<p>Sandve, Norway</p>
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

	.card-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.8rem;
	}

	.card {
		padding: 0.8rem;
		border-radius: 12px;
		border: 1px solid rgba(117, 98, 68, 0.25);
		background: rgba(248, 246, 241, 0.7);
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

		.card-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
