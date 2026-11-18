export type PlanetRoute = '/about' | '/art' | '/climbing' | '/products' | '/contact';

export type PlanetNavItem = {
	label: string;
	href: PlanetRoute;
	description: string;
};

export type PlanetHotspot = PlanetNavItem & {
	index: number;
	x: number;
	y: number;
	visible: boolean;
};

// The order matches the orbit nodes in planet.glb (Sphere, Sphere.001 ... Sphere.004).
export const PLANET_NAV_ITEMS: PlanetNavItem[] = [
	{
		label: 'About',
		href: '/about',
		description: 'who · what · where · photos'
	},
	{
		label: 'Art',
		href: '/art',
		description: 'metal · painting · digital form · exhibitions'
	},
	{
		label: 'Climbing',
		href: '/climbing',
		description: 'wall building · inspection · route setting'
	},
	{
		label: 'Products',
		href: '/products',
		description: 'handforged tools and axes, made to order'
	},
	{
		label: 'Contact',
		href: '/contact',
		description: 'email · instagram · youtube · orders'
	}
];
