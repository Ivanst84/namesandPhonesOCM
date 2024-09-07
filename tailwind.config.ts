
import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */

const config: Config = {  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Archivos en la carpeta pages

    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        neonWhite: '0 0 5px rgba(255, 255, 255, 0.6), 0 0 10px rgba(255, 255, 255, 0.6), 0 0 15px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.6)',      },
      keyframes: {
        pulse: {
          '0%': { opacity: '0.7' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.7' },
        },
      },
      animation: {
        pulse: 'pulse 1.5s ease-in-out',
      },
    },
  },
  plugins: [],
}
export default config;