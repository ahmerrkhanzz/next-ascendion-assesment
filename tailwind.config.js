/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',        // for App Router
    './pages/**/*.{js,ts,jsx,tsx}',      // for Pages Router
    './components/**/*.{js,ts,jsx,tsx}', // for components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
