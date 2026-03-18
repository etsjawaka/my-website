<script lang="ts">
	import { onMount } from 'svelte';
	import { Canvas, T, useTask } from '@threlte/core';
	import { useGltf, type ThrelteGltf } from '@threlte/extras';
	import { Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D } from 'three';

	let gltf: ThrelteGltf | null = null;
	let planetRoot: Object3D | null = null;

	const loader = useGltf();

	const parentWireMaterial = new MeshBasicMaterial({
		color: '#050505',
		wireframe: true,
		transparent: true,
		opacity: 1
	});

	function styleModel(root: Object3D) {
		root.traverse((object) => {
			if (!(object instanceof Mesh)) return;
			object.material = parentWireMaterial;
		});

		root.children.forEach((target) => {
			target.traverse((object) => {
				if (!(object instanceof Mesh)) return;

				object.material = new MeshStandardMaterial({
					color: '#8a795d',
					emissive: '#8a795d',
					emissiveIntensity: 0.16,
					transparent: true,
					opacity: 0.08,
					metalness: 0,
					roughness: 0.4,
					depthWrite: false
				});
			});
		});
	}

	async function loadModel() {
		try {
			// eslint-disable-next-line svelte/require-store-reactive-access
			const model = await loader.load('/models/planet.glb');
			gltf = model;

			planetRoot =
				model.scene.getObjectByName('PlanetRoot') ?? model.scene.children[0] ?? model.scene;
			if (planetRoot) styleModel(planetRoot);
		} catch {
			// Decorative element only; ignore load failure silently.
		}
	}

	useTask((delta: number) => {
		if (!planetRoot) return;

		planetRoot.rotation.y += delta * 0.08;
		planetRoot.rotation.z += delta * 0.018;
	});

	onMount(() => {
		loadModel();
	});
</script>

<div class="mini-shell" aria-hidden="true">
	<Canvas dpr={1.5} shadows={false} colorManagementEnabled>
		<T.PerspectiveCamera makeDefault position={[0, 0, 4.8]} fov={26} />
		<T.AmbientLight intensity={1.5} />
		<T.DirectionalLight position={[4.2, 4.8, 3.4]} intensity={2} />
		<T.PointLight position={[-4, -2, 3.5]} intensity={0.85} />

		{#if gltf}
			<T is={gltf.scene} />
		{/if}
	</Canvas>
</div>

<style>
	.mini-shell {
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.mini-shell :global(canvas) {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
