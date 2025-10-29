/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // if you ever switch to App Router
  ],

  // Enable class-based dark mode toggle (use 'class' instead of 'media' for more control)
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        // Core brand + accent colors
        primary: "#00BFA5",
        secondary: "#FFB703",
        accent: "#00D4FF",

        // Background + surface + text layers (work with your CSS variables)
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: {
          DEFAULT: "#1C1F2A",
          light: "#2A2E3F",
          dark: "#141720",
        },

        // Semantic colors for better design consistency
        success: "#4ADE80",
        warning: "#FBBF24",
        error: "#F87171",
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },

      // Consistent spacing and container setup
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "6rem",
        },
      },

      // Rounded and shadow tokens for consistent UI depth
      borderRadius: {
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      boxShadow: {
        card: "0 4px 16px rgba(0,0,0,0.2)",
        soft: "0 2px 8px rgba(0,0,0,0.08)",
      },
    },
  },

  plugins: [
    // Example plugin for scrollbar or typography if you want to extend later:
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
  ],
};