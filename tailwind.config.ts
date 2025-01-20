import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sand: {
          50: '#FDF5E6',
          100: '#F5E6D3',
          200: '#E6B17E',
          300: '#D4945F',
          400: '#C17B4D',
          500: '#A65D3B',
          600: '#8B4513',
          700: '#2A1810',
        },
        beige: {
          DEFAULT: '#ffe996',
          light: '#e4dfd9',
          dark: '#c8beb4'
        },
        cream: {
          50: '#FFFDF5',
          100: '#FFF8E7',
        },
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
