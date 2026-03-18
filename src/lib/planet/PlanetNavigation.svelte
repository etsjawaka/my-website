<script lang="ts">
	import { resolve } from '$app/paths';
	import { Canvas, T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import PlanetScene from '$lib/planet/PlanetScene.svelte';
	import { PLANET_NAV_ITEMS } from '$lib/planet/navigation';

	let hoveredIndex: number | null = null;
	let canvasWrapEl: HTMLDivElement;
	let pointerDownX = 0;
	let pointerDownY = 0;
	let status = '';
	let loadError = '';

	function openHotspot(index: number) {
		const item = PLANET_NAV_ITEMS[index];
		if (!item) return;
		window.location.assign(resolve(item.href));
	}

	function handlePointerDown(event: PointerEvent) {
		pointerDownX = event.clientX;
		pointerDownY = event.clientY;
	}

	function handlePointerUp(event: PointerEvent) {
		const moved = Math.hypot(event.clientX - pointerDownX, event.clientY - pointerDownY);
		if (hoveredIndex !== null && moved <= 16) openHotspot(hoveredIndex);
	}

	function handlePointerLeave() {
		hoveredIndex = null;
	}

	$: hoveredItem =
		hoveredIndex !== null && PLANET_NAV_ITEMS[hoveredIndex] ? PLANET_NAV_ITEMS[hoveredIndex] : null;
</script>

<section class="planet-shell">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="canvas-wrap"
		bind:this={canvasWrapEl}
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
			/>
		</Canvas>

		{#if hoveredItem}
			<span class="hover-label">
				{hoveredItem.label}
			</span>
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
		bottom: 52px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 3;
		pointer-events: none;
		border: 1px solid rgba(117, 98, 68, 0.55);
		border-radius: 999px;
		background: rgba(248, 246, 241, 0.97);
		color: #5d4f3b;
		padding: 0.5rem 0.75rem;
		font-size: 0.88rem;
		font-weight: 700;
		backdrop-filter: blur(10px);
		line-height: 1;
		white-space: nowrap;
		box-shadow: 0 8px 18px rgba(44, 37, 25, 0.18);
	}

	@media (max-width: 680px) {
		.hover-label {
			font-size: 0.8rem;
			padding: 0.42rem 0.62rem;
			bottom: 40px;
		}
	}
</style>
