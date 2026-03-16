<main>
  <section class="blog-shell">
    <p class="eyebrow">Blog</p>
    <h1>Notes, process updates and writing.</h1>
    <p class="lede">
      This page is linked as the fifth destination in the planet navigation. Replace this placeholder
      with your latest posts, essays or studio updates.
    </p>

    <article class="card">
      <h2>Latest</h2>
      <p>First post coming soon.</p>
    </article>
  </section>
</main>

<style>
  main {
    min-height: calc(100vh - 77px);
    padding: clamp(1rem, 2.8vw, 2rem);
    color: var(--text-color, #8a795d);
    font-family: sans-serif;
  }

  .blog-shell {
    max-width: 900px;
    margin: 0 auto;
  }

  .eyebrow {
    margin: 0 0 0.5rem;
    font-size: 0.85rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    font-size: clamp(2rem, 4vw, 3.4rem);
    line-height: 1.02;
    color: #655844;
  }

  .lede {
    max-width: 58ch;
    line-height: 1.65;
  }

  .card {
    margin-top: 1.5rem;
    border: 1px solid #b7b2a6;
    border-radius: 18px;
    background: #ece6d9;
    padding: 1rem;
  }

  .card h2 {
    margin: 0 0 0.6rem;
    color: #655844;
  }

  .card p {
    margin: 0;
    line-height: 1.6;
  }
</style>
