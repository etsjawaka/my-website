<script lang="ts">
  import { Canvas, T } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import PlanetScene from '$lib/planet/PlanetScene.svelte';
  import {
    PLANET_NAV_ITEMS,
    type PlanetHotspot
  } from '$lib/planet/navigation';

  let hotspots: PlanetHotspot[] = [];
  let hoveredIndex: number | null = null;
  let status = 'Loading planet model...';
  let loadError = '';

  function handleHotspotsChange(nextHotspots: PlanetHotspot[]) {
    hotspots = nextHotspots;
  }

  $: hoveredHotspot =
    hoveredIndex !== null && hotspots[hoveredIndex] && hotspots[hoveredIndex].visible
      ? hotspots[hoveredIndex]
      : null;
</script>

<section class="planet-shell">
  <div class="intro-card">
    <p class="eyebrow">Navigation Planet</p>
    <h2>PlanetRoot now acts as the entry map for the site.</h2>
    <p>
      Each of the five orbiting objects is mapped to one page: Mainpage, About, Contact, Art CV
      and Products. Drag to inspect and click an orb to open its page.
    </p>
    <p class="status" class:error={Boolean(loadError)}>{loadError || status}</p>
  </div>

  <div class="stage-card">
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

      {#if hoveredHotspot}
        <div class="hover-label" style={`left:${hoveredHotspot.x}px;top:${hoveredHotspot.y}px;`}>
          {hoveredHotspot.label}
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .planet-shell {
    display: grid;
    gap: 1rem;
  }

  .intro-card,
  .stage-card {
    border: 1px solid #b7b2a6;
    border-radius: 20px;
    background: linear-gradient(155deg, #efefec 0%, #e4e4e0 100%);
    box-shadow: 0 18px 34px rgba(98, 84, 56, 0.08);
  }

  .intro-card {
    padding: clamp(1.1rem, 2.4vw, 1.6rem);
  }

  .eyebrow {
    margin: 0 0 0.5rem;
    font-size: 0.8rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  h2 {
    margin: 0;
    font-size: clamp(1.65rem, 3vw, 2.7rem);
    line-height: 1.02;
    color: #655844;
  }

  .intro-card > p {
    max-width: 60ch;
    line-height: 1.65;
  }

  .status {
    margin-bottom: 0;
    font-size: 0.95rem;
  }

  .status.error {
    color: #8b3d2f;
  }

  .stage-card {
    padding: 0.75rem;
  }

  .canvas-wrap {
    position: relative;
    min-height: min(72vw, 720px);
    background:
      radial-gradient(circle at 50% 14%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0) 34%),
      radial-gradient(circle at 50% 54%, rgba(138, 121, 93, 0.08), rgba(138, 121, 93, 0) 48%),
      linear-gradient(180deg, #e8e8e5 0%, #ddddda 100%);
    border-radius: 16px;
    overflow: hidden;
  }

  .canvas-wrap :global(canvas) {
    display: block;
    width: 100%;
    height: 100%;
  }

  .hover-label {
    position: absolute;
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
  }

  @media (max-width: 980px) {
    .canvas-wrap {
      min-height: 620px;
    }
  }

  @media (max-width: 680px) {
    .canvas-wrap {
      min-height: 540px;
    }

    .hover-label {
      font-size: 0.8rem;
      padding: 0.42rem 0.62rem;
    }
  }
</style>