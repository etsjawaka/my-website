<script lang="ts">
	import { resolve } from '$app/paths';
	import { Canvas, T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import PlanetScene from '$lib/planet/PlanetScene.svelte';
	import { PLANET_NAV_ITEMS } from '$lib/planet/navigation';

	let hoveredIndex: number | null = null;
	let mobileArmedIndex: number | null = null;
	let planetSceneRef: any;
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

		const nextIndex = planetSceneRef?.updateHoverFromEvent
			? planetSceneRef.updateHoverFromEvent(event, 'down')
			: hoveredIndex;

		if (typeof nextIndex === 'number' || nextIndex === null) {
			hoveredIndex = nextIndex;
		}

		if (!isMobile) return;

		// On touch screens the first tap shows the big label, the second tap opens the page.
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
		if (!isMobile && hoveredIndex !== null) openHotspot(hoveredIndex);
	}

	function handlePointerLeave() {
		if (!isMobile) hoveredIndex = null;
		if (planetSceneRef?.updateHoverFromEvent) {
			planetSceneRef.updateHoverFromEvent(null, 'leave');
		}
	}

	function menuEnter(index: number) {
		hoveredIndex = index;
	}

	function menuLeave() {
		hoveredIndex = null;
		mobileArmedIndex = null;
	}

	$: isMobile = innerWidth <= 680;
	$: cameraDistance = isMobile ? 5.25 : 4.4;
	$: cameraFov = isMobile ? 36 : 30;
	$: minPolarAngle = isMobile ? 1.45 : 0.95;
	$: maxPolarAngle = isMobile ? 1.45 : 2.15;
	$: activeItem = hoveredIndex !== null ? (PLANET_NAV_ITEMS[hoveredIndex] ?? null) : null;
</script>

<svelte:window bind:innerWidth />

<section class="planet-shell">
	<header class="identity">
		<h1>Espen Tangen Samuelsen</h1>
		<p>artist · smith · climbing walls</p>
	</header>

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="canvas-wrap"
		class:has-active={activeItem !== null}
		on:pointerdown={handlePointerDown}
		on:pointermove={(event) => {
			if (planetSceneRef?.updateHoverFromEvent) {
				planetSceneRef.updateHoverFromEvent(event, 'move');
			}
		}}
		on:pointerup={handlePointerUp}
		on:pointerleave={handlePointerLeave}
	>
		<!-- The logo sits behind the planet; its two rings turn slowly like the arrows suggest. -->
		<div class="logo-backdrop" aria-hidden="true">
			<img class="ring outer" src="/logo-outer.png" alt="" />
			<img class="ring inner" src="/logo-inner.png" alt="" />
			<img class="ring center" src="/logo-center.png" alt="" />
		</div>

		<div class="big-label" aria-live="polite">
			{#if activeItem}
				{#key activeItem.href}
					<p class="big-word">{activeItem.label.toLowerCase()}</p>
					<p class="big-desc">{activeItem.description}</p>
					{#if isMobile}
						<p class="big-hint">tap again to open</p>
					{/if}
				{/key}
			{/if}
		</div>

		<Canvas dpr={isMobile ? 1.2 : 1.5} shadows={false} colorManagementEnabled>
			<T.PerspectiveCamera makeDefault position={[0, 0.1, cameraDistance]} fov={cameraFov}>
				<OrbitControls
					enablePan={false}
					enableRotate={!isMobile}
					enableZoom={false}
					minDistance={cameraDistance}
					maxDistance={cameraDistance}
					{minPolarAngle}
					{maxPolarAngle}
				/>
			</T.PerspectiveCamera>

			<T.AmbientLight intensity={1.65} />
			<T.DirectionalLight position={[4.5, 5.5, 4]} intensity={2.3} />
			<T.PointLight position={[-5, -3, 4]} intensity={1.1} />

			<PlanetScene
				bind:this={planetSceneRef}
				items={PLANET_NAV_ITEMS}
				{isMobile}
				bind:hoveredIndex
				bind:status
				bind:loadError
			/>
		</Canvas>
	</div>

	<nav class="text-menu" aria-label="Main menu">
		{#each PLANET_NAV_ITEMS as item, index (item.href)}
			<!-- Full page load, like the planet nodes: client-side navigation away from the 3D canvas stalls. -->
			<a
				href={item.href}
				data-sveltekit-reload
				class:active={hoveredIndex === index}
				on:mouseenter={() => menuEnter(index)}
				on:mouseleave={menuLeave}
				on:focus={() => menuEnter(index)}
				on:blur={menuLeave}>{item.label.toLowerCase()}</a
			>
		{/each}
	</nav>
</section>

<style>
	.planet-shell {
		position: relative;
		height: 100dvh;
		min-height: 100vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		background: #fff;
		color: #111;
	}

	.identity {
		position: absolute;
		top: 1.4rem;
		left: 1.6rem;
		z-index: 30;
		pointer-events: none;
	}

	.identity h1 {
		margin: 0;
		font-size: clamp(0.95rem, 2vw, 1.15rem);
		font-weight: 700;
		letter-spacing: 0.04em;
	}

	.identity p {
		margin: 0.2rem 0 0;
		font-size: 0.85rem;
		color: #555;
	}

	.canvas-wrap {
		position: relative;
		width: 100%;
		flex: 1 1 0;
		min-height: 0;
		touch-action: none;
		overflow: hidden;
		cursor: grab;
	}

	.canvas-wrap.has-active {
		cursor: pointer;
	}

	.canvas-wrap :global(canvas) {
		position: relative;
		z-index: 2;
		display: block;
		width: 100%;
		height: 100%;
	}

	/* ---- logo behind the planet ---- */
	.logo-backdrop {
		position: absolute;
		z-index: 0;
		left: 50%;
		top: 50%;
		width: min(92vmin, 880px);
		aspect-ratio: 1;
		transform: translate(-50%, -50%);
		opacity: 0.11;
		pointer-events: none;
		transition: opacity 400ms ease;
	}

	.has-active .logo-backdrop {
		opacity: 0.05;
	}

	.ring {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		user-select: none;
	}

	/* The outer arrow points clockwise, the inner one counter-clockwise; each ring turns the way its arrow points. */
	.ring.outer {
		animation: spin 140s linear infinite;
	}

	.ring.inner {
		animation: spin 90s linear infinite reverse;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* ---- big hover text ---- */
	.big-label {
		position: absolute;
		z-index: 1;
		left: clamp(1rem, 4vw, 3.5rem);
		bottom: clamp(1rem, 4vh, 2.5rem);
		pointer-events: none;
		max-width: calc(100% - 2rem);
	}

	.big-word {
		margin: 0;
		font-size: clamp(3.4rem, 13vw, 11rem);
		font-weight: 700;
		line-height: 0.9;
		letter-spacing: -0.04em;
		color: #111;
		animation: label-in 260ms ease both;
	}

	.big-desc {
		margin: 0.6rem 0 0;
		font-size: clamp(0.95rem, 1.8vw, 1.25rem);
		color: #333;
		animation: label-in 320ms ease 60ms both;
	}

	.big-hint {
		margin: 0.35rem 0 0;
		font-size: 0.8rem;
		color: #777;
	}

	@keyframes label-in {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	/* ---- plain text menu ---- */
	.text-menu {
		position: relative;
		z-index: 30;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.4rem 1.6rem;
		padding: 0.9rem 1rem calc(1.1rem + env(safe-area-inset-bottom, 0px));
		border-top: 1px solid #111;
		background: #fff;
	}

	.text-menu a {
		color: #111;
		text-decoration: none;
		font-size: 1rem;
		letter-spacing: 0.04em;
		padding: 0.15rem 0.1rem;
		border-bottom: 1px solid transparent;
	}

	.text-menu a:hover,
	.text-menu a:focus-visible,
	.text-menu a.active {
		border-bottom-color: #111;
	}

	@media (prefers-reduced-motion: reduce) {
		.ring.outer,
		.ring.inner,
		.big-word,
		.big-desc {
			animation: none;
		}
	}

	@media (max-width: 680px) {
		.identity {
			left: 1rem;
			top: calc(1rem + env(safe-area-inset-top, 0px));
		}

		.logo-backdrop {
			width: 118vmin;
		}

		.big-label {
			left: 1rem;
			bottom: 0.8rem;
		}

		.text-menu {
			gap: 0.4rem 1.1rem;
		}
	}
</style>
