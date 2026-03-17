<script lang="ts">
  import { goto } from '$app/navigation';
  import { Canvas, T } from '@threlte/core';
  import { OrbitControls } from '@threlte/extras';
  import PlanetScene from '$lib/planet/PlanetScene.svelte';
  import { PLANET_NAV_ITEMS, type PlanetHotspot } from '$lib/planet/navigation';

  const HOTSPOT_PICK_RADIUS = 92;

  let hoveredIndex: number | null = null;
  let hotspots: PlanetHotspot[] = [];
  let canvasWrapEl: HTMLDivElement;
  let pointerDownX = 0;
  let pointerDownY = 0;
  let status = '';
  let loadError = '';

  function handleHotspotsChange(nextHotspots: PlanetHotspot[]) {
    hotspots = nextHotspots;
  }

  function openHotspot(index: number) {
    const item = PLANET_NAV_ITEMS[index];
    if (!item) return;
    goto(item.href);
  }

  function pickNearestHotspot(event: PointerEvent): PlanetHotspot | null {
    if (!canvasWrapEl || !hotspots.length) return null;

    const bounds = canvasWrapEl.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    let nearest: PlanetHotspot | null = null;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (const hotspot of hotspots) {
      const distance = Math.hypot(x - hotspot.x, y - hotspot.y);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = hotspot;
      }
    }

    return nearestDistance <= HOTSPOT_PICK_RADIUS ? nearest : null;
  }

  function handlePointerMove(event: PointerEvent) {
    const hotspot = pickNearestHotspot(event);
    hoveredIndex = hotspot ? hotspot.index : null;
  }

  function handlePointerDown(event: PointerEvent) {
    pointerDownX = event.clientX;
    pointerDownY = event.clientY;
    const hotspot = pickNearestHotspot(event);
    hoveredIndex = hotspot ? hotspot.index : null;
  }

  function handlePointerUp(event: PointerEvent) {
    const moved = Math.hypot(event.clientX - pointerDownX, event.clientY - pointerDownY);
    const hotspot = pickNearestHotspot(event);
    if (hotspot && moved <= 16) openHotspot(hotspot.index);
  }

  function handlePointerLeave() {
    hoveredIndex = null;
  }

  $: hoveredItem =
    hoveredIndex !== null && PLANET_NAV_ITEMS[hoveredIndex]
      ? PLANET_NAV_ITEMS[hoveredIndex]
      : null;

  $: hoveredHotspot =
    hoveredIndex !== null && hotspots[hoveredIndex] ? hotspots[hoveredIndex] : null;
</script>

<section class="planet-shell">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="canvas-wrap"
    bind:this={canvasWrapEl}
    on:pointermove={handlePointerMove}
    on:pointerdown={handlePointerDown}
    on:pointerup={handlePointerUp}
    on:pointerleave={handlePointerLeave}
  >
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

    {#if hoveredItem && hoveredHotspot}
      <a
        class="hover-label"
        href={hoveredItem.href}
        style={`left:${hoveredHotspot.x}px;top:${hoveredHotspot.y - 24}px;`}
      >
        {hoveredItem.label}
      </a>
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
    z-index: 3;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(117, 98, 68, 0.55);
    border-radius: 999px;
    background: rgba(248, 246, 241, 0.97);
    color: #5d4f3b;
    padding: 0.5rem 0.75rem;
    font-size: 0.88rem;
    font-weight: 700;
    pointer-events: auto;
    backdrop-filter: blur(10px);
    line-height: 1;
    white-space: nowrap;
    box-shadow: 0 8px 18px rgba(44, 37, 25, 0.18);
    text-decoration: none;
    cursor: pointer;
  }

  @media (max-width: 680px) {
    .hover-label {
      font-size: 0.8rem;
      padding: 0.42rem 0.62rem;
    }
  }
</style>