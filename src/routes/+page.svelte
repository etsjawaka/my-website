<script lang="ts">
  import { onMount } from 'svelte';

  type Photo = {
    src: string;
    caption: string;
  };

  let photos: Photo[] = [];
  let current = 0;
  let intervalId: ReturnType<typeof setInterval> | null = null;
  let autoplayDelay = 3500;
  let reelHeight = 320;
  let lightboxOpen = false;
  let lightboxIndex = 0;
  let latestShortEmbed = '';
  let latestShortWatch = 'https://www.youtube.com/@galaxiuschaos/shorts';
  let latestShortError = '';

  function formatCaption(filename: string) {
    return filename
      .replace(/\.[^.]+$/, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (c: string) => c.toUpperCase());
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

  onMount(() => {
    const init = async () => {
      try {
        const shortsRes = await fetch('/api/latest-short');
        const shortsData = (await shortsRes.json()) as {
          embedUrl?: string;
          watchUrl?: string;
          error?: string;
        };
        if (shortsRes.ok && shortsData.embedUrl) {
          latestShortEmbed = shortsData.embedUrl;
          latestShortWatch = shortsData.watchUrl || latestShortWatch;
        } else {
          latestShortError = shortsData.error || 'Could not load latest short.';
        }
      } catch {
        latestShortError = 'Could not load latest short.';
      }

      try {
        const res = await fetch('/api/photos');
        const list = (await res.json()) as string[];
        photos = Array.isArray(list)
          ? list.map((src: string) => ({
              src,
              caption: formatCaption(src.split('/').pop() || '')
            }))
          : [];
        startAutoplay();
      } catch {
        photos = [];
      }
    };

    function onKey(e: KeyboardEvent) {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }

    init();
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

  function openLightbox(i: number) {
    lightboxIndex = i;
    lightboxOpen = true;
    stopAutoplay();
  }

  function handleLightboxKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closeLightbox();
    }
  }

  function closeLightbox() {
    lightboxOpen = false;
    if (photos.length > 1) startAutoplay();
  }
</script>

<style>
  main {
    background: var(--bg-color, #dedad0);
    color: var(--text-color, #8a795d);
    min-height: 100vh;
    padding: clamp(1rem, 2.8vw, 2rem);
    font-family: sans-serif;
  }

  .photo-reel {
    margin-bottom: 2rem;
    max-width: 560px;
  }

  .viewport {
    width: 100%;
    height: var(--reel-height, 320px);
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid #b7b2a6;
    background: #d7d2c7;
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

  .slide-button {
    appearance: none;
    background: transparent;
    border: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    cursor: zoom-in;
  }

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
    flex-wrap: wrap;
    justify-content: center;
  }

  .controls button {
    background: transparent;
    color: var(--text-color, #8a795d);
    border: 0;
    padding: 0.25rem 0.5rem;
    border-radius: 0;
    cursor: pointer;
    min-width: 0;
    font-size: 1.4rem;
    line-height: 1;
    font-weight: 700;
  }

  .controls button:hover {
    opacity: 0.7;
  }

  a {
    color: var(--text-color, #8a795d);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .blog-section {
    margin: 0;
    padding-top: 1.25rem;
    border-top: 1px solid #9a9a9a;
    max-width: 560px;
  }

  .blog-section h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    margin-top: 0;
  }

  .short-frame {
    width: 100%;
    aspect-ratio: 9 / 16;
    max-width: 340px;
    border: 1px solid #b7b2a6;
    border-radius: 8px;
    overflow: hidden;
    background: #d7d2c7;
  }

  .short-frame iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }

  .short-fallback {
    margin-top: 0.75rem;
    color: var(--text-color, #8a795d);
    font-size: 0.95rem;
  }

  @media (max-width: 980px) {
    .photo-reel,
    .blog-section {
      max-width: 480px;
    }
  }

  @media (max-width: 700px) {
    .photo-reel,
    .blog-section {
      max-width: 100%;
    }

    .viewport {
      height: 72vw;
      max-height: 320px;
    }

    .short-frame {
      max-width: 100%;
    }

    .blog-section {
      padding-top: 1rem;
    }
  }

  @media (max-width: 480px) {
    .blog-section h2 {
      font-size: 1.2rem;
    }
  }
</style>

<main>
  <section class="photo-reel">
    {#if photos.length === 0}
      <div class="viewport">
        <div
          class="slide"
          style="height:100%;display:flex;align-items:center;justify-content:center;color:#666"
        >
          Add images to /static/photos to populate the reel
        </div>
      </div>
    {:else}
      <div
        class="viewport"
        role="region"
        aria-label="Photo reel"
        aria-live="polite"
        on:mouseenter={stopAutoplay}
        on:mouseleave={() => {
          if (!lightboxOpen) startAutoplay();
        }}
        style="--reel-height: {reelHeight}px;"
      >
        <div class="slides" style="transform: translateX(-{current * 100}%);">
          {#each photos as p, i}
            <div class="slide">
              <button
                class="slide-button"
                type="button"
                on:click={() => openLightbox(i)}
                aria-label={`Open photo ${i + 1} in lightbox`}
              >
                <img src={p.src} alt={p.caption} loading="lazy" />
              </button>
            </div>
          {/each}
        </div>
      </div>
      <div class="controls">
        <button on:click={prev} aria-label="Previous">◀</button>
        <button on:click={next} aria-label="Next">▶</button>
      </div>
      {#if lightboxOpen}
        <div
          class="lightbox"
          role="dialog"
          aria-modal="true"
          tabindex="0"
          on:click={closeLightbox}
          on:keydown={handleLightboxKeydown}
        >
          <img src={photos[lightboxIndex].src} alt={photos[lightboxIndex].caption} />
        </div>
      {/if}
    {/if}
  </section>

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
</main>
