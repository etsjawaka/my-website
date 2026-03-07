<script>
  import { fade } from 'svelte/transition';
  // Later you can load products dynamically or from a JSON file
  // start with just one product as requested
  let products = [
    {
      name: "Øksedor /Axe Drift",
      description: "",
      image: "/products/oksedor.jpg" // file you will add to static
    }
  ];
</script>

<style>
  main {
    color: #e6e6e6;
    min-height: 100vh;
    padding: 2rem;
    font-family: sans-serif;
  }

  h1 {
    margin-bottom: 1.5rem;
  }

  .block {
    margin-bottom: 2rem;
    padding: 8rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .block h1 {
    font-size: 2rem;
    margin: 0;
  }

  .block p {
    margin-top: 0.5rem;
    color: var(--accent, #00eaff);
  }

  .product {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #333;
  }

  img {
    width: 250px;
    border: 2px solid #444;
    border-radius: 6px;
    margin-top: 0.5rem;
  }

  .glass {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 2rem;
  }

  .hero {
    padding: 10rem 2rem;
    text-align: center;
  }

  .features {
    display: grid;
    gap: 2rem;
    padding: 6rem 2rem;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .card {
    padding: 2rem;
    border-radius: 12px;
  }
</style>

<main>
  <section class="hero" in:fade={{ duration: 1000 }}>
    <h1>Build Something Intelligent</h1>
    <p>Your tagline goes here.</p>
  </section>

  <section class="features">
    <div class="card glass">
      <h2>Feature One</h2>
      <p>Description...</p>
    </div>
    <div class="card glass">
      <h2>Feature Two</h2>
      <p>Description...</p>
    </div>
  </section>

  <section class="block">
    <h1>Products</h1>
    <p>Your text... (replace this with a description of your shop or offerings)</p>
  </section>

  <!-- general description textbox above all products -->
  <p class="site-description">""</p>

  {#each products as product}
    <div class="product">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <img src={product.image} alt={product.name} loading="lazy" />
    </div>
  {/each}
</main>
