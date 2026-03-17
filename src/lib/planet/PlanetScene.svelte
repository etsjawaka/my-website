<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { T, useTask, useThrelte } from '@threlte/core';
  import { useGltf, type ThrelteGltf } from '@threlte/extras';
  import { Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, Raycaster, Vector2, Vector3 } from 'three';
  import type { PlanetHotspot, PlanetNavItem } from '$lib/planet/navigation';

  export let items: PlanetNavItem[] = [];
  export let hoveredIndex: number | null = null;
  export let hoverX = 0;
  export let hoverY = 0;
  export let status = 'Loading planet model...';
  export let loadError = '';
  export let onHotspotsChange: (hotspots: PlanetHotspot[]) => void = () => {};

  let gltf: ThrelteGltf | null = null;
  let mounted = false;
  let planetRoot: Object3D | null = null;
  let clickTargets: Object3D[] = [];
  let pointerDownX = 0;
  let pointerDownY = 0;

  const loader = useGltf();
  const { camera, dom, invalidate } = useThrelte();
  const raycaster = new Raycaster();
  const pointer = new Vector2();
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
    clickTargets = planetRoot.children.slice(0, items.length);

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

  function setPointerFromEvent(event: PointerEvent | MouseEvent) {
    const bounds = dom.getBoundingClientRect();
    hoverX = event.clientX - bounds.left;
    hoverY = event.clientY - bounds.top;
    pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
  }

  function findTargetIndex(object: Object3D | null) {
    let currentObject = object;

    while (currentObject) {
      const index = clickTargets.indexOf(currentObject);
      if (index !== -1) return index;
      currentObject = currentObject.parent;
    }

    return -1;
  }

  function pickTarget(event: PointerEvent | MouseEvent) {
    if (!clickTargets.length) return -1;

    setPointerFromEvent(event);
    raycaster.setFromCamera(pointer, camera.current);

    const intersections = raycaster.intersectObjects(clickTargets, true);
    if (intersections.length) {
      return findTargetIndex(intersections[0].object);
    }

    // Fallback: pick nearest projected child center to make hover/click more forgiving.
    const bounds = dom.getBoundingClientRect();
    const px = event.clientX - bounds.left;
    const py = event.clientY - bounds.top;

    let nearestIndex = -1;
    let nearestDistance = Number.POSITIVE_INFINITY;

    clickTargets.forEach((target, index) => {
      worldPosition.setFromMatrixPosition(target.matrixWorld).project(camera.current);

      if (worldPosition.z <= -1 || worldPosition.z >= 1) return;

      const tx = (worldPosition.x * 0.5 + 0.5) * bounds.width;
      const ty = (-worldPosition.y * 0.5 + 0.5) * bounds.height;
      const distance = Math.hypot(px - tx, py - ty);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    return nearestDistance <= 64 ? nearestIndex : -1;
  }

  function updateCursor() {
    dom.style.cursor = hoveredIndex === null ? 'grab' : 'pointer';
  }

  function handlePointerDown(event: PointerEvent) {
    pointerDownX = event.clientX;
    pointerDownY = event.clientY;

    const index = pickTarget(event);
    hoveredIndex = index === -1 ? null : index;

    dom.style.cursor = 'grabbing';
  }

  function handlePointerMove(event: PointerEvent) {
    const index = pickTarget(event);
    hoveredIndex = index === -1 ? null : index;
    updateCursor();
  }

  function handlePointerLeave() {
    hoveredIndex = null;
    hoverX = 0;
    hoverY = 0;
    dom.style.cursor = 'grab';
  }

  function handlePointerUp(event: PointerEvent) {
    const moved = Math.hypot(event.clientX - pointerDownX, event.clientY - pointerDownY);
    const index = pickTarget(event);

    // Treat small pointer movement as an intentional click/tap on a child object.
    if (moved <= 18 && index >= 0 && items[index]) {
      goto(items[index].href);
      return;
    }

    updateCursor();
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

    dom.style.cursor = 'grab';
    dom.addEventListener('pointerdown', handlePointerDown);
    dom.addEventListener('pointermove', handlePointerMove);
    dom.addEventListener('pointerleave', handlePointerLeave);
    dom.addEventListener('pointerup', handlePointerUp);

    return () => {
      mounted = false;
      dom.removeEventListener('pointerdown', handlePointerDown);
      dom.removeEventListener('pointermove', handlePointerMove);
      dom.removeEventListener('pointerleave', handlePointerLeave);
      dom.removeEventListener('pointerup', handlePointerUp);
      dom.style.cursor = 'auto';
      resetHotspots();
    };
  });
</script>

{#if gltf}
  <T is={gltf.scene} />
{/if}