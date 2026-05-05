<script lang="ts">
	type Product = {
		name: string;
		description: string;
		price: string;
		image: string;
		alt: string;
	};

	const products: Product[] = [
		{
			name: 'stemjern',
			description: 'Handmade from preference.',
			price: 'From 500 NOK',
			image: '/products/stemjern.jpg',
			alt: 'Stemjern handmade product'
		},
		{
			name: 'øks',
			description: 'Handmade from preference.',
			price: 'From 4000 NOK',
			image: '/products/øks.jpg',
			alt: 'Øks handmade product'
		}
	];
</script>

<main aria-label="Products page">
	<section class="page-panel">
		<h1>products</h1>
		<p>Handmade pieces. Prices are starting prices and can vary by finish and details.</p>

		<div class="product-grid">
			{#each products as product}
				<article class="product-card">
					<img src={product.image} alt={product.alt} loading="lazy" />
					<h2>{product.name}</h2>
					<p>{product.description}</p>
					<span class="price">{product.price}</span>
					<a
						class="buy-button"
						href={
							`/contact?subject=${encodeURIComponent(`Order request: ${product.name}`)}&message=${encodeURIComponent(`Hi, I want to buy ${product.name}. Price: ${product.price}.`)}`
						}
					>
						Buy
					</a>
				</article>
			{/each}
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
		font-weight: 600;
		letter-spacing: 0.02em;
		text-transform: lowercase;
		color: rgba(88, 73, 46, 0.96);
	}

	p {
		margin: 0;
		line-height: 1.5;
	}

	.product-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
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

	.product-card img {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		border-radius: 10px;
		border: 1px solid rgba(117, 98, 68, 0.22);
	}

	h2 {
		margin: 0;
		font-size: 0.95rem;
		text-transform: lowercase;
		letter-spacing: 0.02em;
	}

	.price {
		width: fit-content;
		color: rgba(88, 73, 46, 0.96);
		font-weight: 700;
	}

	.buy-button {
		width: fit-content;
		padding: 0.42rem 0.68rem;
		border-radius: 999px;
		border: 1px solid rgba(88, 73, 46, 0.5);
		background: rgba(88, 73, 46, 0.08);
		color: rgba(63, 51, 32, 0.98);
		font-size: 0.85rem;
		font-weight: 700;
		text-decoration: none;
		transition: background-color 150ms ease, transform 150ms ease;
	}

	.buy-button:hover {
		background: rgba(88, 73, 46, 0.16);
		transform: translateY(-1px);
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
