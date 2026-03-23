<script lang="ts">
	import { resolve } from '$app/paths';
	import { Canvas, T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import PlanetScene from '$lib/planet/PlanetScene.svelte';
	import { PLANET_NAV_ITEMS } from '$lib/planet/navigation';

	let hoveredIndex: number | null = null;
	let mobileArmedIndex: number | null = null;
	let canvasWrapEl: HTMLDivElement;
	let planetSceneRef: any;
	let pointerDownX = 0;
	let pointerDownY = 0;
	let innerWidth = 1200;
	let status = '';
	let loadError = '';

	function setPanelLabel(index: number | null) {
		const labelEl = document.querySelector<HTMLElement>('[data-planet-hover-label]');
		if (!labelEl) return;

		labelEl.textContent = index !== null && PLANET_NAV_ITEMS[index]
			? PLANET_NAV_ITEMS[index].label.toLowerCase()
			: '';
	}

	function openHotspot(index: number) {
		const item = PLANET_NAV_ITEMS[index];
		if (!item) return;
		window.location.assign(resolve(item.href));
	}

	function handlePointerDown(event: PointerEvent) {
		pointerDownX = event.clientX;
		pointerDownY = event.clientY;

		const nextIndex = planetSceneRef?.updateHoverFromEvent
			? planetSceneRef.updateHoverFromEvent(event, 'down')
			: hoveredIndex;

		if (typeof nextIndex === 'number' || nextIndex === null) {
			hoveredIndex = nextIndex;
		}

		if (isMobile) {
			setPanelLabel(nextIndex);
		}

		if (!isMobile) return;

		if (nextIndex === null) {
			mobileArmedIndex = null;
			return;
		}

		if (mobileArmedIndex === nextIndex) {
			mobileArmedIndex = null;
			openHotspot(nextIndex);
			return;
		}

		mobileArmedIndex = nextIndex;
	}

	function handlePointerUp(event: PointerEvent) {
		const moved = Math.hypot(event.clientX - pointerDownX, event.clientY - pointerDownY);
		if (moved > 16) return;
		// Desktop only: mobile navigation is handled via handleChildTap
		if (!isMobile && hoveredIndex !== null) openHotspot(hoveredIndex);
	}

	function handlePointerLeave() {
		if (!isMobile) {
			hoveredIndex = null;
			setPanelLabel(null);
		}
		if (planetSceneRef?.updateHoverFromEvent) {
			planetSceneRef.updateHoverFromEvent(null, 'leave');
		}
	}

	$: isMobile = innerWidth <= 680;
	$: cameraDistance = isMobile ? 5.25 : 4.4;
	$: cameraFov = isMobile ? 36 : 30;
	$: minPolarAngle = isMobile ? 1.45 : 0.95;
	$: maxPolarAngle = isMobile ? 1.45 : 2.15;
</script>

<svelte:window bind:innerWidth />

<section class="planet-shell">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="canvas-wrap"
		bind:this={canvasWrapEl}
		on:pointerdown={handlePointerDown}
		on:pointermove={(event) => {
			if (planetSceneRef?.updateHoverFromEvent) {
				planetSceneRef.updateHoverFromEvent(event, 'move');
			}
		}}
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
				bind:this={planetSceneRef}
				items={PLANET_NAV_ITEMS}
				isMobile={isMobile}
				bind:hoveredIndex
				bind:status
				bind:loadError
			/>
		</Canvas>

		<div class="term-panel" aria-live="polite">
			<div class="term-line" data-planet-hover-label></div>
		</div>

		<!-- Large label overlay (removed, showing in box instead) -->
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
			radial-gradient(circle at 50% 14%, rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0) 38%),
			radial-gradient(circle at 50% 54%, rgba(208, 194, 167, 0.12), rgba(208, 194, 167, 0) 54%),
			linear-gradient(180deg, #f6f4ef 0%, #eeeadf 100%);
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
		border: 1px solid rgba(255, 255, 255, 0.34);
		background: rgba(244, 239, 230, 0.54);
		backdrop-filter: blur(2px);
		box-shadow: 0 10px 26px rgba(108, 95, 73, 0.12);
		border-radius: 8px;
		min-height: 1.5rem;
		min-width: 8.5rem;
	}

	.term-line {
		font-family: 'Courier New', Courier, monospace;
		font-size: clamp(0.95rem, 2.5vw, 1.2rem);
		font-weight: 600;
		color: rgba(88, 73, 46, 0.96);
		letter-spacing: 0.02em;
		line-height: 1.35;
		user-select: none;
		transition: opacity 0.25s ease;
	}

	@media (max-width: 680px) {
		.canvas-wrap {
			background:
				radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0) 40%),
				radial-gradient(circle at 50% 50%, rgba(226, 214, 188, 0.18), rgba(226, 214, 188, 0) 58%),
				linear-gradient(180deg, #fbf9f4 0%, #f1ece3 100%);
		}

		.term-panel {
			left: 1rem;
			right: auto;
			bottom: calc(1rem + env(safe-area-inset-bottom, 0px) + 3.75rem);
			padding: 0.78rem 0.88rem;
			background: rgba(248, 244, 236, 0.72);
			border-color: rgba(177, 161, 131, 0.36);
			min-width: 7.5rem;
		}

		.term-line {
			font-size: 1rem;
			color: rgba(87, 73, 50, 0.98);
		}
	}
</style>
