<script lang="ts">
  import { goto } from '$app/navigation';
  import { Canvas, T } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import PlanetScene from '$lib/planet/PlanetScene.svelte';
  import { PLANET_NAV_ITEMS, type PlanetHotspot } from '$lib/planet/navigation';

  let hoveredIndex: number | null = null;
  let hotspots: PlanetHotspot[] = [];
  let status = '';
  let loadError = '';

  function handleHotspotsChange(nextHotspots: PlanetHotspot[]) {
    hotspots = nextHotspots;
  }

  function handleHotspotEnter(index: number) {
    hoveredIndex = index;
  }

  function handleHotspotLeave(index: number) {
    if (hoveredIndex === index) hoveredIndex = null;
  }

  function openHotspot(index: number) {
    const item = PLANET_NAV_ITEMS[index];
    if (!item) return;
    goto(item.href);
  }

  $: hoveredItem =
    hoveredIndex !== null && PLANET_NAV_ITEMS[hoveredIndex]
      ? PLANET_NAV_ITEMS[hoveredIndex]
      : null;

  $: hoveredHotspot =
    hoveredIndex !== null && hotspots[hoveredIndex] ? hotspots[hoveredIndex] : null;
</script>

<section class="planet-shell">
  <div class="canvas-wrap">
    <Canvas dpr={1.5} shadows={false} colorManagementEnabled>
      <T.PerspectiveCamera makeDefault position={[0, 0.1, 4.4]} fov={30}>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minDistance={4.4}
          maxDistance={4.4}
          minPolarAngle={0.95}
          maxPolarAngle={2.15}
        />
      </T.PerspectiveCamera>

      <T.AmbientLight intensity={1.65} />
      <T.DirectionalLight position={[4.5, 5.5, 4]} intensity={2.3} />
      <T.PointLight position={[-5, -3, 4]} intensity={1.1} />

      <PlanetScene
        items={PLANET_NAV_ITEMS}
        bind:hoveredIndex
        bind:status
        bind:loadError
        onHotspotsChange={handleHotspotsChange}
      />
    </Canvas>

    {#each hotspots as hotspot (hotspot.index)}
      {#if hotspot.visible}
        <button
          class="hotspot-hit"
          style={`left:${hotspot.x}px;top:${hotspot.y}px;`}
          aria-label={`Open ${hotspot.label}`}
          on:mouseenter={() => handleHotspotEnter(hotspot.index)}
          on:mouseleave={() => handleHotspotLeave(hotspot.index)}
          on:pointerdown={() => handleHotspotEnter(hotspot.index)}
          on:click={() => openHotspot(hotspot.index)}
        ></button>
      {/if}
    {/each}

    {#if hoveredItem && hoveredHotspot}
      <div class="hover-label" style={`left:${hoveredHotspot.x}px;top:${hoveredHotspot.y - 24}px;`}>
        {hoveredItem.label}
      </div>
    {/if}

    {#if hoveredItem}
      <a class="hover-banner active hover-banner-link" href={hoveredItem.href}>
        {hoveredItem.label}
      </a>
    {:else}
      <div class="hover-banner">Hover a child object</div>
    {/if}
  </div>
</section>

<style>
  .planet-shell {
    height: 100vh;
  }

  .canvas-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background:
      radial-gradient(circle at 50% 14%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0) 34%),
      radial-gradient(circle at 50% 54%, rgba(138, 121, 93, 0.08), rgba(138, 121, 93, 0) 48%),
      linear-gradient(180deg, #e8e8e5 0%, #ddddda 100%);
    overflow: hidden;
  }

  .canvas-wrap :global(canvas) {
    display: block;
    width: 100%;
    height: 100%;
  }

  .hover-label {
    position: absolute;
    z-index: 2;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(117, 98, 68, 0.55);
    border-radius: 999px;
    background: rgba(248, 246, 241, 0.97);
    color: #5d4f3b;
    padding: 0.5rem 0.75rem;
    font-size: 0.88rem;
    font-weight: 700;
    pointer-events: none;
    backdrop-filter: blur(10px);
    line-height: 1;
    white-space: nowrap;
    box-shadow: 0 8px 18px rgba(44, 37, 25, 0.18);
  }

  .hotspot-hit {
    position: absolute;
    width: 64px;
    height: 64px;
    transform: translate(-50%, -50%);
    border: 0;
    border-radius: 999px;
    background: transparent;
    cursor: pointer;
    z-index: 1;
    padding: 0;
  }

  .hover-banner {
    position: absolute;
    left: 50%;
    bottom: clamp(1rem, 2.4vw, 1.8rem);
    transform: translateX(-50%);
    z-index: 2;
    border: 1px solid rgba(117, 98, 68, 0.42);
    border-radius: 999px;
    background: rgba(248, 246, 241, 0.74);
    color: #7c6a4d;
    padding: 0.45rem 0.9rem;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    pointer-events: none;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }

  .hover-banner.active {
    border-color: rgba(117, 98, 68, 0.62);
    background: rgba(248, 246, 241, 0.96);
    color: #5d4f3b;
  }

  .hover-banner-link {
    pointer-events: auto;
    text-decoration: none;
    cursor: pointer;
  }

  @media (max-width: 680px) {
    .hotspot-hit {
      width: 72px;
      height: 72px;
    }

    .hover-label {
      font-size: 0.8rem;
      padding: 0.42rem 0.62rem;
    }
  }
</style>