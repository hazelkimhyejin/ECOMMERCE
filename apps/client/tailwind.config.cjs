/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "bumblebee"
    ],
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/line-clamp'),
  ],
}

// {
//   mytheme: {
  
// "primary": "#ea523a",
  
// "secondary": "#6cbf13",
  
// "accent": "#8a9b09",
  
// "neutral": "#242C38",
  
// "base-100": "#F9F5FA",
  
// "info": "#2398E1",
  
// "success": "#1EA44F",
  
// "warning": "#B97413",
  
// "error": "#E35454",
//   },
// },