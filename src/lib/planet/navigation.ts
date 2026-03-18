export type PlanetNavItem = {
  label: string;
  href: string;
  description: string;
};

export type PlanetHotspot = PlanetNavItem & {
  index: number;
  x: number;
  y: number;
  visible: boolean;
};

export const PLANET_NAV_ITEMS: PlanetNavItem[] = [
  {
    label: 'About',
    href: '/about',
    description: 'Image reel, studio text and blog box.'
  },
  {
    label: 'Contact',
    href: '/contact',
    description: 'Direct ways to get in touch.'
  },
  {
    label: 'CV',
    href: '/art-cv',
    description: 'Practice summary and CV structure.'
  },
  {
    label: 'Blog',
    href: '/blog',
    description: 'Writing, notes and latest updates.'
  },
  {
    label: 'Products',
    href: '/products',
    description: 'Products and shop links.'
  }
];