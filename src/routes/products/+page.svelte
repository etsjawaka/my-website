<script>
  import { fade } from 'svelte/transition';
</script>

<style>
  main {
    background: var(--bg-color, #dedad0);
    color: var(--text-color, #8a795d);
    min-height: 100vh;
    padding: clamp(1rem, 2.8vw, 2rem);
    font-family: sans-serif;
  }

  .glass {
    background: #ebe7dd;
    backdrop-filter: blur(10px);
    border: 1px solid #b7b2a6;
    border-radius: 12px;
    padding: 2rem;
    max-width: 680px;
    margin: 0 auto;
  }

  .hero {
    padding: clamp(2.5rem, 10vw, 10rem) clamp(1rem, 3vw, 2rem) clamp(2rem, 8vw, 6rem);
    text-align: center;
  }

  @media (max-width: 600px) {
    .glass {
      padding: 1.25rem;
    }
  }
</style>

<main>
  <section class="hero" in:fade={{ duration: 1000 }}>
    <div class="glass">
      <h1>Coming soon</h1>
      <p>Products are on the way. Please check back soon.</p>
    </div>
  </section>
</main>
