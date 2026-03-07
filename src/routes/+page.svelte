<script>
  import { onMount } from 'svelte';

  let photos = [];
  let current = 0;
  let intervalId;
  let autoplayDelay = 3500;
  let reelHeight = 320;
  let lightboxOpen = false;
  let lightboxIndex = 0;
  let latestShortEmbed = '';
  let latestShortWatch = 'https://www.youtube.com/@galaxiuschaos/shorts';
  let latestShortError = '';

  function formatCaption(filename) {
    return filename
      .replace(/\.[^.]+$/, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function startAutoplay() {
    if (intervalId || photos.length <= 1 || lightboxOpen) return;
    intervalId = setInterval(() => {
      current = (current + 1) % photos.length;
    }, autoplayDelay);
  }

  function stopAutoplay() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  onMount(async () => {
    try {
      const shortsRes = await fetch('/api/latest-short');
      const shortsData = await shortsRes.json();
      if (shortsRes.ok && shortsData.embedUrl) {
        latestShortEmbed = shortsData.embedUrl;
        latestShortWatch = shortsData.watchUrl || latestShortWatch;
      } else {
        latestShortError = shortsData.error || 'Could not load latest short.';
      }
    } catch (e) {
      latestShortError = 'Could not load latest short.';
    }

    try {
      const res = await fetch('/api/photos');
      const list = await res.json();
      photos = list.map((src) => ({ src, caption: formatCaption(src.split('/').pop() || '') }));
      startAutoplay();
    } catch (e) {
      photos = [];
    }

    function onKey(e) {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }

    window.addEventListener('keydown', onKey);
    return () => {
      stopAutoplay();
      window.removeEventListener('keydown', onKey);
    };
  });

  function prev() {
    if (photos.length) current = (current - 1 + photos.length) % photos.length;
  }

  function next() {
    if (photos.length) current = (current + 1) % photos.length;
  }

  function openLightbox(i) {
    lightboxIndex = i;
    lightboxOpen = true;
    stopAutoplay();
  }

  function closeLightbox() {
    lightboxOpen = false;
    // resume autoplay if appropriate
    if (photos.length > 1) startAutoplay();
  }
</script>

<style>
  main {
    background: black;
    color: white;
    min-height: 100vh;
    padding: 2rem;
    font-family: sans-serif;
  }

  header {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  /* photo reel */
  .photo-reel {
    margin-bottom: 1.5rem;
  }

  .content {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
  }

  .main-left {
    flex: 1 1 auto;
    min-width: 0;
  }

  .reel-container {
    flex: 0 0 auto;
    max-width: 480px;
    width: 100%;
    margin-left: auto;
  }

  .viewport {
    width: 100%;
    height: var(--reel-height, 320px);
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid #333;
    background: #0b0b0b;
  }

  .slides {
    display: flex;
    transition: transform 0.5s ease;
    height: 100%;
  }

  .slide {
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slide img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: block;
  }

  .caption {
    color: #ccc;
    text-align: center;
    margin-top: 0.5rem;
    font-size: 0.95rem;
  }

  /* lightbox */
  .lightbox {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.85);
    z-index: 9999;
  }

  .lightbox img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border: 2px solid #222;
    border-radius: 6px;
  }

  .controls {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.5rem;
  }

  .controls button {
    background: #111;
    color: #fff;
    border: 1px solid #333;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    cursor: pointer;
  }

  a {
    color: #66aaff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .btn {
    display: inline-block;
    background: #111;
    color: #fff;
    border: 1px solid #333;
    padding: 0.6rem 0.9rem;
    border-radius: 6px;
    text-decoration: none;
    font-size: 0.95rem;
  }

  .btn:hover {
    background: #0e0e0e;
    border-color: #444;
  }

  .textbox {
    margin: 2rem 0;
    padding: 1rem;
    background: #222;
    border: 1px solid #444;
    border-radius: 6px;
    min-height: 120px;
  }

  .blog-section {
    margin: 2rem 0;
  }

  .blog-section h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .short-frame {
    width: 100%;
    aspect-ratio: 9 / 16;
    max-width: 380px;
    border: 1px solid #333;
    border-radius: 8px;
    overflow: hidden;
    background: #111;
  }

  .short-frame iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }

  .short-fallback {
    margin-top: 0.75rem;
    color: #bbb;
    font-size: 0.95rem;
  }

  .blog-post {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 6px;
  }

  .blog-post h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
  }

  .blog-date {
    font-size: 0.85rem;
    color: #999;
    margin-bottom: 0.5rem;
  }

  .blog-content {
    line-height: 1.6;
    color: #ddd;
  }

  nav {
    margin-top: 2rem;
  }

  nav ul {
    list-style: none;
    padding: 0;
  }

  nav li {
    margin: 0.5rem 0;
  }

  @media (max-width: 700px) {
    .content {
      flex-direction: column-reverse;
    }

    .reel-container {
      max-width: 100%;
    }
  }
</style>

<main>
  <div class="content">
    <div class="main-left">
      <div class="textbox">
        Vikra Smie Tangen Tang

      </div>

      <section class="blog-section">
        <h2>Latest YouTube Short</h2>
        {#if latestShortEmbed}
          <div class="short-frame">
            <iframe
              src={latestShortEmbed}
              title="Latest YouTube Short from @galaxiuschaos"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        {:else}
          <div class="short-fallback">
            {latestShortError || 'Loading latest short...'}
          </div>
        {/if}
        <div class="short-fallback">
          <a href={latestShortWatch} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
        </div>
      </section>

    </div>

    <aside class="reel-container">
      <section class="photo-reel">
        {#if photos.length === 0}
          <div class="viewport">
            <div class="slide" style="height:100%;display:flex;align-items:center;justify-content:center;color:#666">
              Add images to /static/photos to populate the reel
            </div>
          </div>
        {:else}
          <div class="viewport" aria-live="polite" on:mouseenter={stopAutoplay} on:mouseleave={() => { if (!lightboxOpen) startAutoplay(); }} style="--reel-height: {reelHeight}px;">
            <div class="slides" style="transform: translateX(-{current * 100}%);">
              {#each photos as p, i}
                <div class="slide">
                  <img src={p.src} alt={p.caption} loading="lazy" on:click={() => openLightbox(i)} />
                </div>
              {/each}
            </div>
          </div>
          <div class="controls">
            <button on:click={prev} aria-label="Previous">◀</button>
            <button on:click={next} aria-label="Next">▶</button>
          </div>
          {#if lightboxOpen}
            <div class="lightbox" role="dialog" aria-modal="true" on:click={closeLightbox}>
              <img src={photos[lightboxIndex].src} alt={photos[lightboxIndex].caption} />
            </div>
          {/if}
        {/if}
      </section>
    </aside>
  </div>
</main>
