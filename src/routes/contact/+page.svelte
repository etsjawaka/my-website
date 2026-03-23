<script lang="ts">
</script>

<main aria-label="Contact page">
	<section class="page-panel">
		<h1>contact</h1>

		<div class="card-grid">
			<article class="card">
				<h2>email</h2>
				<p><a href="mailto:post@ione.no">post@ione.no</a></p>
			</article>
			<article class="card">
				<h2>social</h2>
				<p>
					YouTube:
					<a href="https://www.youtube.com/@galaxiuschaos" target="_blank" rel="noreferrer"
						>@galaxiuschaos</a
					>
				</p>
				<p>
					Instagram:
					<a href="https://www.instagram.com/dobbel_smultring" target="_blank" rel="noreferrer"
						>@dobbel_smultring</a
					>
				</p>
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
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.8rem;
	}

	.card {
		padding: 0.8rem;
		border-radius: 12px;
		border: 1px solid rgba(117, 98, 68, 0.25);
		background: rgba(248, 246, 241, 0.7);
		opacity: 0;
		transform: translateY(10px);
		animation: card-rise 420ms ease forwards;
	}

	.card:nth-child(1) { animation-delay: 60ms; }
	.card:nth-child(2) { animation-delay: 130ms; }
	.card:nth-child(3) { animation-delay: 200ms; }

	h2 {
		margin: 0 0 0.3rem;
		font-size: 0.95rem;
		text-transform: lowercase;
		letter-spacing: 0.02em;
	}

	a {
		color: rgba(88, 73, 46, 0.96);
		text-decoration: none;
		border-bottom: 1px solid rgba(88, 73, 46, 0.36);
		transition: border-color 180ms ease, color 180ms ease;
	}

	a:hover {
		color: rgba(63, 51, 32, 0.98);
		border-color: rgba(63, 51, 32, 0.7);
	}

	@keyframes card-rise {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.card {
			animation: none;
			opacity: 1;
			transform: none;
		}
	}

	@media (max-width: 760px) {
		main {
			padding-top: 4.3rem;
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
