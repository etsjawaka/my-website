<main>
  <section class="cv-shell">
    <p class="eyebrow">Art CV</p>
    <h1>A living CV page for sculpture, forging and image-based work.</h1>
    <p class="lede">
      This route is scaffolded so the planet already has a destination for your CV page. Replace
      the sections with your actual exhibitions, residencies, education and collections.
    </p>

    <div class="cv-grid">
      <article class="card">
        <h2>Practice</h2>
        <p>Forging, sculptural object making, material studies, image documentation and product work.</p>
      </article>

      <article class="card">
        <h2>Selected Structure</h2>
        <ul>
          <li>Selected exhibitions</li>
          <li>Residencies or workshops</li>
          <li>Education and training</li>
          <li>Collections and commissions</li>
        </ul>
      </article>

      <article class="card wide">
        <h2>Notes</h2>
        <p>
          If you want, this can later become a more formal CV with downloadable PDF, exhibition
          thumbnails and filtered categories. For now it is a clean destination linked from the
          planet model.
        </p>
      </article>
    </div>
  </section>
</main>

<style>
  main {
    min-height: calc(100vh - 77px);
    padding: clamp(1rem, 2.8vw, 2rem);
    color: var(--text-color, #8a795d);
    font-family: sans-serif;
  }

  .cv-shell {
    max-width: 980px;
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
    max-width: 60ch;
    line-height: 1.65;
  }

  .cv-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .card {
    border: 1px solid #b7b2a6;
    border-radius: 18px;
    background: #ece6d9;
    padding: 1rem;
  }

  .card h2 {
    margin: 0 0 0.65rem;
    color: #655844;
  }

  .card p,
  .card li {
    line-height: 1.6;
  }

  .wide {
    grid-column: 1 / -1;
  }

  ul {
    margin: 0;
    padding-left: 1.2rem;
  }

  @media (max-width: 760px) {
    .cv-grid {
      grid-template-columns: 1fr;
    }

    .wide {
      grid-column: auto;
    }
  }
</style>