// Exactly two products for the Fynd Hiring Hackathon:
// 1. Wireless Mouse – ₹799
// 2. Mechanical Keyboard – ₹1,499

export const PRODUCTS = [
  {
    id: 'wireless-mouse',
    numericId: 1,
    name: 'Wireless Mouse',
    price: 799,
    formattedPrice: '₹799',
    category: 'OPTICAL HARDWARE',
    tagline: 'HyperSpeed 2.4GHz Zero-Latency Optical Sensor',
    description: 'Ergonomic ambidextrous chassis with 26K DPI optical sensor, ultra-low friction virgin PTFE skates, and 85-hour battery reserve.',
    accentColor: '#00F2FE',
    glowColor: 'rgba(0, 242, 254, 0.4)',
    badge: '26K DPI OPTIC',
    specs: ['78g Featherlight', '2.4GHz Wireless', '85h Battery'],
    svgType: 'mouse'
  },
  {
    id: 'mechanical-keyboard',
    numericId: 2,
    name: 'Mechanical Keyboard',
    price: 1499,
    formattedPrice: '₹1,499',
    category: 'TACTILE INTERFACE',
    tagline: 'Gasket-Mounted Hot-Swappable Neo RGB Switchboard',
    description: 'Aero-grade aluminum CNC body with pre-lubed linear switches, sound dampening PORON foam layers, and customizable per-key lighting.',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    badge: 'GASKET LINEAR',
    specs: ['Hot-Swappable', 'Per-Key Neo RGB', 'CNC Billet'],
    svgType: 'keyboard'
  }
];
