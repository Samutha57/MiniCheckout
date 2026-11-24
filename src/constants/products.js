// Fixed product catalogue:
// 1. Wireless Mouse – ₹799
// 2. Mechanical Keyboard – ₹1,499

export const PRODUCTS = [
  {
    id: 'wireless-mouse',
    numericId: 1,
    name: 'Wireless Mouse',
    price: 799,
    formattedPrice: '₹799',
    category: 'Accessories',
    tagline: 'High-precision wireless optical sensor with ergonomic grip',
    description: 'Ergonomic chassis with smooth optical sensor and long-lasting battery life.',
    accentColor: '#00F2FE',
    glowColor: 'rgba(0, 242, 254, 0.4)',
    specs: ['78g Lightweight', '2.4GHz Wireless', '85h Battery'],
    svgType: 'mouse'
  },
  {
    id: 'mechanical-keyboard',
    numericId: 2,
    name: 'Mechanical Keyboard',
    price: 1499,
    formattedPrice: '₹1,499',
    category: 'Keyboards',
    tagline: 'Smooth linear mechanical switches with customizable lighting',
    description: 'Durable chassis with pre-lubed linear switches and soft dampening.',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    specs: ['Linear Switches', 'Custom RGB', 'Aluminum Body'],
    svgType: 'keyboard'
  }
];
