/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "mui-green": "#4caf50",
        "mui-blue": "#1976d2",
        "mui-red": "#d32f2f",
        "mui-success": "#2e7d32",
        "mui-hovered-blue": "rgba(25, 118, 210, 0.04)"
      },
      maxWidth: {
        'container': '1536px',
      },
      boxShadow: {
        'card': 'rgba(0, 0, 0, 0.12) 0px 5px 22px 4px',
      },
      screens: {
        'max-md': {'max': '1008px'},
        'max-sm': {'max': '672px'},
      },
      width: {
        "custom": "45%"
      }
    },
  },
  plugins: [],
}