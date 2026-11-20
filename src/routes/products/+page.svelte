<script lang="ts">
	type Product = {
		name: string;
		description: string;
		price: string;
		image: string;
		alt: string;
		imageFit?: 'cover' | 'contain';
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
			alt: 'Øks handmade product',
			imageFit: 'contain'
		}
	];
</script>

<svelte:head>
	<title>products · ione</title>
</svelte:head>

<main class="page" aria-label="Products page">
	<header>
		<h1 class="page-title">products</h1>
		<p class="lede">
			Handforged pieces made to order in the smithy in Sandve. Prices are starting prices and vary with
			size, steel and finish.
		</p>
	</header>

	<section>
		<h2 class="section-title">made to order</h2>
		<div class="product-grid">
			{#each products as product (product.name)}
				<article class="product">
					<div class="image">
						<img
							src={product.image}
							alt={product.alt}
							loading="lazy"
							class:fit-contain={product.imageFit === 'contain'}
						/>
					</div>
					<div class="info">
						<h3>{product.name}</h3>
						<p>{product.description}</p>
						<p class="price">{product.price}</p>
						<a
							class="button"
							href={`/contact?subject=${encodeURIComponent(`Order request: ${product.name}`)}&message=${encodeURIComponent(`Hi, I want to buy ${product.name}. Price: ${product.price}.`)}`}
						>
							order
						</a>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section>
		<h2 class="section-title">more</h2>
		<ul class="links">
			<li>Looking for something else? Custom tools and repairs are welcome. <a href="/contact">Ask me.</a></li>
			<li>
				More 3D-printable designs, free to download:
				<a href="https://www.thingiverse.com/espen/designs" target="_blank" rel="noopener noreferrer"
					>Thingiverse &#8599;</a
				>
			</li>
		</ul>
	</section>
</main>

<style>
	.product-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.25rem;
	}

	.product {
		border: var(--line);
		display: grid;
		grid-template-rows: auto 1fr;
	}

	.image {
		border-bottom: var(--line);
		background: #f4f4f4;
	}

	.image img {
		display: block;
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
	}

	.image img.fit-contain {
		object-fit: contain;
	}

	.info {
		padding: 1rem 1.1rem 1.2rem;
		display: grid;
		gap: 0.45rem;
		align-content: start;
	}

	.info h3 {
		margin: 0;
		font-size: 1.4rem;
		text-transform: lowercase;
	}

	.info p {
		margin: 0;
	}

	.links {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.5rem;
	}

	.price {
		font-weight: 700;
	}
</style>
