import { writable } from 'svelte/store';

export const hoveredPlanetLabelIndex = writable<number | null>(null);