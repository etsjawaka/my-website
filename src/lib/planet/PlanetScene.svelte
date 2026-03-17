<script lang="ts">
  import { onMount } from 'svelte';
  import { T, useTask, useThrelte } from '@threlte/core';
  import { useGltf, type ThrelteGltf } from '@threlte/extras';
  import { Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, Vector3 } from 'three';
  import type { PlanetHotspot, PlanetNavItem } from '$lib/planet/navigation';

  export let items: PlanetNavItem[] = [];
  export let hoveredIndex: number | null = null;
  export let status = 'Loading planet model...';
  export let loadError = '';
  export let onHotspotsChange: (hotspots: PlanetHotspot[]) => void = () => {};

  let gltf: ThrelteGltf | null = null;
  let mounted = false;
  let planetRoot: Object3D | null = null;
  let clickTargets: Object3D[] = [];

  const loader = useGltf();
  const { camera, dom, invalidate } = useThrelte();
  const worldPosition = new Vector3();
  const desiredScale = new Vector3();
  const baseScales = new Map<Object3D, Vector3>();
  const childMaterials = new Map<Object3D, MeshStandardMaterial[]>();

  const parentWireMaterial = new MeshBasicMaterial({
    color: '#050505',
    wireframe: true,
    transparent: true,
    opacity: 1
  });

  function styleParentMesh(target: Object3D) {
    target.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      object.material = parentWireMaterial;
    });
  }

  function styleChildTargets() {
    childMaterials.clear();

    clickTargets.forEach((target) => {
      const materials: MeshStandardMaterial[] = [];

      target.traverse((object) => {
        if (!(object instanceof Mesh)) return;

        const material = new MeshStandardMaterial({
          color: '#8a795d',
          emissive: '#8a795d',
          emissiveIntensity: 0.2,
          transparent: true,
          opacity: 0.07,
          metalness: 0,
          roughness: 0.35,
          depthWrite: false
        });

        object.material = material;
        materials.push(material);
      });

      childMaterials.set(target, materials);
    });
  }

  function resetHotspots() {
    onHotspotsChange(
      items.map((item, index) => ({
        ...item,
        index,
        x: 0,
        y: 0,
        visible: false
      }))
    );
  }

  function syncTargets(model: ThrelteGltf) {
    planetRoot = model.scene.getObjectByName('PlanetRoot') ?? model.scene.children[0] ?? model.scene;
    const namedTargets = ['Sphere', 'Sphere.001', 'Sphere.002', 'Sphere.003', 'Sphere.004']
      .map((name) => planetRoot?.getObjectByName(name))
      .filter((obj): obj is Object3D => Boolean(obj));

    clickTargets =
      namedTargets.length === items.length ? namedTargets : planetRoot.children.slice(0, items.length);

    styleParentMesh(planetRoot);
    styleChildTargets();

    baseScales.clear();
    clickTargets.forEach((target) => {
      baseScales.set(target, target.scale.clone());
    });

    if (clickTargets.length === items.length) {
      status = 'Planet ready. Drag to inspect and click an orb.';
    } else {
      status = `Planet ready with ${clickTargets.length} orbit nodes mapped.`;
    }
  }

  async function loadModel() {
    loadError = '';

    try {
      const model = await loader.load('/models/planet.glb');
      gltf = model;
      syncTargets(model);
      invalidate();
    } catch {
      loadError = 'Could not load /models/planet.glb.';
      status = 'Planet model failed to load.';
      resetHotspots();
    }
  }

  function updateHotspots() {
    if (!mounted || !clickTargets.length) return;

    const bounds = dom.getBoundingClientRect();

    onHotspotsChange(
      clickTargets.map((target, index) => {
        worldPosition.setFromMatrixPosition(target.matrixWorld).project(camera.current);

        const visible =
          worldPosition.z > -1 &&
          worldPosition.z < 1 &&
          worldPosition.x > -1.5 &&
          worldPosition.x < 1.5 &&
          worldPosition.y > -1.5 &&
          worldPosition.y < 1.5;

        return {
          ...items[index],
          index,
          x: (worldPosition.x * 0.5 + 0.5) * bounds.width,
          y: (-worldPosition.y * 0.5 + 0.5) * bounds.height,
          visible
        };
      })
    );
  }

  useTask(
    (delta: number) => {
      if (!planetRoot) return;

      planetRoot.rotation.y += delta * 0.1;
      planetRoot.rotation.z += delta * 0.022;

      clickTargets.forEach((target, index) => {
        const baseScale = baseScales.get(target);
        if (!baseScale) return;

        desiredScale.copy(baseScale).multiplyScalar(index === hoveredIndex ? 1.16 : 1);
        target.scale.lerp(desiredScale, 0.14);

        const materials = childMaterials.get(target) || [];
        const targetOpacity = index === hoveredIndex ? 0.2 : 0.07;
        const targetGlow = index === hoveredIndex ? 0.58 : 0.2;

        materials.forEach((material) => {
          material.opacity += (targetOpacity - material.opacity) * 0.18;
          material.emissiveIntensity += (targetGlow - material.emissiveIntensity) * 0.18;
        });
      });

      updateHotspots();
    },
    {
      autoInvalidate: true
    }
  );

  onMount(() => {
    mounted = true;
    resetHotspots();
    loadModel();

    return () => {
      mounted = false;
      resetHotspots();
    };
  });
</script>

{#if gltf}
  <T is={gltf.scene} />
{/if}