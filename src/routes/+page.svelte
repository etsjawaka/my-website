<script lang="ts">
  import PlanetNavigation from '$lib/planet/PlanetNavigation.svelte';
</script>

<style>
  main {
    background: var(--bg-color, #dedad0);
    color: var(--text-color, #8a795d);
    min-height: calc(100vh - 77px);
    padding: clamp(1rem, 2.8vw, 2rem);
    font-family: sans-serif;
  }

  .hero {
    display: grid;
    gap: 1rem;
    max-width: 1180px;
    margin: 0 auto;
  }

  .hero-copy {
    border: 1px solid #b7b2a6;
    border-radius: 20px;
    padding: clamp(1.2rem, 2.8vw, 2rem);
    background: linear-gradient(145deg, #efe9dc 0%, #e4ddcf 100%);
    box-shadow: 0 18px 34px rgba(98, 84, 56, 0.08);
  }

  .eyebrow {
    margin: 0 0 0.5rem;
    font-size: 0.85rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    font-size: clamp(2.3rem, 5vw, 4.8rem);
    line-height: 0.96;
    color: #655844;
    max-width: 11ch;
  }

  .hero-copy p:last-child {
    max-width: 62ch;
    line-height: 1.65;
    margin-bottom: 0;
  }
</style>

<main>
  <section class="hero">
    <div class="hero-copy">
      <p class="eyebrow">Home</p>
      <h1>Orbit through the site.</h1>
      <p>
        The homepage is now the 3D entry point. The five child objects under PlanetRoot are mapped
        to Mainpage, About, Contact, Art CV and Products, while the image reel and writing have
        moved into the About route.
      </p>
    </div>

    <PlanetNavigation />
  </section>
</main>
