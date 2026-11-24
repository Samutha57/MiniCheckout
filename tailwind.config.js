/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neo: {
          darkest: '#050811',
          bg: '#080E1C',
          surface: '#0E172C',
          card: 'rgba(16, 26, 49, 0.75)',
          border: 'rgba(56, 189, 248, 0.15)',
          borderHover: 'rgba(0, 242, 254, 0.4)',
          cyan: '#00F2FE',
          cyanGlow: '#00D2FF',
          violet: '#8B5CF6',
          violetGlow: '#A855F7',
          neon: '#06B6D4',
          accent: '#22D3EE',
          muted: '#94A3B8',
          text: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace']
      },
      boxShadow: {
        'neo-card': '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 242, 254, 0.08)',
        'neo-glow': '0 0 25px rgba(0, 242, 254, 0.35)',
        'violet-glow': '0 0 25px rgba(139, 92, 246, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      }
    },
  },
  plugins: [],
}
