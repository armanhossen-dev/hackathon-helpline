/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#06080d',
          darker: '#0a0e17',
          dark: '#0f1420',
          card: '#131929',
          cardHover: '#182136',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(0, 255, 102, 0.35)',
        },
        terminal: {
          green: '#00ff66',
          emerald: '#10b981',
          cyan: '#00e5ff',
          purple: '#a855f7',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'terminal-blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [
    function({ addVariant }) {
      addVariant('light', ['.light &', ':root:not(.dark) &']);
    }
  ],
}
