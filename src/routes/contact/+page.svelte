<main>
  <section class="contact-shell">
    <p class="eyebrow">Contact</p>
    <h1>Get in touch about commissions, products or exhibitions.</h1>
    <p class="lede">
      This route is now one of the five destinations wired into the planet model. You can replace
      the text below with a fuller contact form or studio information later.
    </p>

    <div class="contact-grid">
      <article class="card">
        <h2>Email</h2>
        <p>For commissions, collaboration and availability.</p>
        <a href="mailto:post@ione.no">post@ione.no</a>
      </article>

      <article class="card">
        <h2>Project Types</h2>
        <p>Forged objects, sculptural commissions, product discussions and exhibition dialogue.</p>
      </article>

      <article class="card">
        <h2>Response</h2>
        <p>Use this panel for studio location, reply times or social links when you are ready.</p>
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

  .contact-shell {
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
    max-width: 58ch;
    line-height: 1.65;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
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
    margin: 0 0 0.6rem;
    color: #655844;
  }

  .card p,
  .card a {
    margin: 0;
    line-height: 1.55;
    color: inherit;
  }

  .card a {
    text-decoration: none;
    font-weight: 700;
  }

  .card a:hover {
    text-decoration: underline;
  }

  @media (max-width: 820px) {
    .contact-grid {
      grid-template-columns: 1fr;
    }
  }
</style>