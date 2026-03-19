<script lang="ts">
	import { resolve } from '$app/paths';
	import { Canvas, T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import PlanetScene from '$lib/planet/PlanetScene.svelte';
	import { PLANET_NAV_ITEMS } from '$lib/planet/navigation';

	let hoveredIndex: number | null = null;
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
	}

	function handlePointerUp(event: PointerEvent) {
		const moved = Math.hypot(event.clientX - pointerDownX, event.clientY - pointerDownY);
		if (moved > 16) return;
		// Desktop only: mobile navigation is handled via handleChildTap
		if (!isMobile && hoveredIndex !== null) openHotspot(hoveredIndex);
	}

	function handleChildTap(index: number) {
		if (!isMobile) return;
		if (mobileArmedIndex === index) {
			// Second tap on the same child → navigate
			mobileArmedIndex = null;
			openHotspot(index);
		} else {
			// First tap → show label
			mobileArmedIndex = index;
		}
	}

	function handleEmptyTap() {
		if (!isMobile) return;
		mobileArmedIndex = null;
	}

	function handleSceneHoverChange(event: CustomEvent<{ index: number | null }>) {
		hoveredIndex = event.detail.index;
	}

	function handleSceneChildTap(event: CustomEvent<{ index: number }>) {
		handleChildTap(event.detail.index);
	}

	function handleSceneEmptyTap() {
		handleEmptyTap();
	}

	function handlePointerLeave() {
		hoveredIndex = null;
	}

	$: isMobile = innerWidth <= 680;
	$: cameraDistance = isMobile ? 5.25 : 4.4;
	$: cameraFov = isMobile ? 36 : 30;
	$: minPolarAngle = isMobile ? 1.45 : 0.95;
	$: maxPolarAngle = isMobile ? 1.45 : 2.15;

	$: labelIndex = isMobile ? mobileArmedIndex : hoveredIndex;

	$: activeLabel =
		labelIndex !== null && PLANET_NAV_ITEMS[labelIndex]
			? PLANET_NAV_ITEMS[labelIndex].label.toLowerCase()
			: '';
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
				on:hoverchange={handleSceneHoverChange}
				on:childtap={handleSceneChildTap}
				on:emptytap={handleSceneEmptyTap}
			/>
		</Canvas>

		{#if activeLabel}
			<div class="overlay-label" aria-live="polite">
				{activeLabel}
			</div>
		{/if}

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

	.overlay-label {
		position: fixed;
		left: 50%;
		top: 18vh;
		transform: translate(-50%, -50%);
		z-index: 999;
		pointer-events: none;
		border: 1px solid rgba(117, 98, 68, 0.7);
		border-radius: 999px;
		background: rgba(248, 246, 241, 0.98);
		color: #5d4f3b;
		padding: 0.65rem 1rem;
		font-size: 1rem;
		font-weight: 700;
		line-height: 1;
		white-space: nowrap;
		box-shadow: 0 10px 24px rgba(44, 37, 25, 0.22);
		backdrop-filter: blur(10px);
	}

	@media (max-width: 680px) {
		.overlay-label {
			top: 16vh;
			font-size: 0.88rem;
			padding: 0.52rem 0.8rem;
		}
	}
</style>
