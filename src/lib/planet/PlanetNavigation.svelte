<script lang="ts">
	import { resolve } from '$app/paths';
	import { Canvas, T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import PlanetScene from '$lib/planet/PlanetScene.svelte';
	import { PLANET_NAV_ITEMS } from '$lib/planet/navigation';

	let hoveredIndex: number | null = null;
	let labelIndex: number | null = null;
	let mobileArmedIndex: number | null = null;
	let canvasWrapEl: HTMLDivElement;
	let pointerDownX = 0;
	let pointerDownY = 0;
	let innerWidth = 1200;
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

		if (!isMobile) return;

		if (hoveredIndex === null) {
			mobileArmedIndex = null;
			return;
		}

		if (mobileArmedIndex === hoveredIndex) {
			mobileArmedIndex = null;
			openHotspot(hoveredIndex);
			return;
		}

		mobileArmedIndex = hoveredIndex;
	}

	function handlePointerUp(event: PointerEvent) {
		const moved = Math.hypot(event.clientX - pointerDownX, event.clientY - pointerDownY);
		if (moved > 16) return;
		// Desktop only: mobile navigation is handled via handleChildTap
		if (!isMobile && hoveredIndex !== null) openHotspot(hoveredIndex);
	}

	function handlePointerLeave() {
		hoveredIndex = null;
	}

	$: isMobile = innerWidth <= 680;
	$: cameraDistance = isMobile ? 5.25 : 4.4;
	$: cameraFov = isMobile ? 36 : 30;
	$: minPolarAngle = isMobile ? 1.45 : 0.95;
	$: maxPolarAngle = isMobile ? 1.45 : 2.15;
	$: activeLabel =
		labelIndex !== null && PLANET_NAV_ITEMS[labelIndex]
			? PLANET_NAV_ITEMS[labelIndex].label.toLowerCase()
			: 'none';
</script>

<svelte:window bind:innerWidth />

<section class="planet-shell">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="canvas-wrap"
		bind:this={canvasWrapEl}
		on:pointerdown={handlePointerDown}
		on:pointerup={handlePointerUp}
		on:pointerleave={handlePointerLeave}
	>
		<Canvas dpr={isMobile ? 1.2 : 1.5} shadows={false} colorManagementEnabled>
			<T.PerspectiveCamera makeDefault position={[0, 0.1, cameraDistance]} fov={cameraFov}>
				<OrbitControls
					enablePan={false}
					enableRotate={!isMobile}
					enableZoom={false}
					minDistance={cameraDistance}
					maxDistance={cameraDistance}
					minPolarAngle={minPolarAngle}
					maxPolarAngle={maxPolarAngle}
				/>
			</T.PerspectiveCamera>

			<T.AmbientLight intensity={1.65} />
			<T.DirectionalLight position={[4.5, 5.5, 4]} intensity={2.3} />
			<T.PointLight position={[-5, -3, 4]} intensity={1.1} />

			<PlanetScene
				items={PLANET_NAV_ITEMS}
				isMobile={isMobile}
				bind:hoveredIndex
				bind:status
				bind:loadError
				onHoverChange={(idx) => { labelIndex = idx; }}
			/>
		</Canvas>

		<div class="term-panel" aria-live="polite">
			<div class="term-title">nav://planet</div>
			<div class="term-line">&gt; hover: {activeLabel}</div>
			<div class="term-line term-muted">&gt; index: {labelIndex ?? '-'} | armed: {mobileArmedIndex ?? '-'}</div>
		</div>
	</div>
</section>

<style>
	.planet-shell {
		height: 100dvh;
		min-height: 100vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.canvas-wrap {
		position: relative;
		width: 100%;
		flex: 1 1 0;
		min-height: 0;
		touch-action: none;
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

	.term-panel {
		position: absolute;
		bottom: 1.5rem;
		left: 1.5rem;
		z-index: 30;
		pointer-events: none;
		padding: 0.85rem 0.95rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: rgba(22, 20, 17, 0.56);
		backdrop-filter: blur(2px);
		box-shadow: 0 10px 26px rgba(0, 0, 0, 0.25);
		border-radius: 8px;
	}

	.term-title {
		font-family: 'Courier New', Courier, monospace;
		font-size: 0.8rem;
		font-weight: 700;
		color: rgba(238, 225, 195, 0.9);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		margin-bottom: 0.35rem;
	}

	.term-line {
		font-family: 'Courier New', Courier, monospace;
		font-size: clamp(0.85rem, 2.2vw, 1rem);
		font-weight: 600;
		color: rgba(249, 236, 208, 0.98);
		letter-spacing: 0.02em;
		line-height: 1.35;
		user-select: none;
		transition: opacity 0.25s ease;
	}

	.term-muted {
		color: rgba(224, 206, 171, 0.78);
	}

	@media (max-width: 680px) {
	}
</style>
