/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        xs: "420px",
      },
      fontFamily: {
        mono: [
          '"Space Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
        heading: ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        hkf: {
          bg: "#070707",
          bg2: "#0d0d0d",
          bg3: "#101010",
          card: "#121212",
          green: "#00ff66",
          green2: "#00cc55",
          green3: "#22c55e",
          sub: "#b3b3b3",
          mute: "#666666",
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 255, 100, 0.15)",
        "glow-sm": "0 0 10px rgba(0, 255, 100, 0.12)",
        "glow-lg": "0 0 32px rgba(0, 255, 100, 0.22)",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
  ],
}
