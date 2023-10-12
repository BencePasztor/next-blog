import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        pop: "pop .3s ease-out",
      },
      keyframes: {
        pop: {
          "0%": {transform: "scale(0.8)"},
          "45%": {transform: "scale(1.05)"},
          "80%": {transform: "scale(0.95)"},
          "100%": {transform: "scale(1)"}
        },
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],

}
export default config
