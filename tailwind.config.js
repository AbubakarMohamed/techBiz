// tailwind.config.js
import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.example.com",
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        accent: "#0f4c81",
        background: "#ffffff",
        muted: "#f3f4f6",
      },
      fontFamily: {
        roboto: ["var(--font-roboto)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "gradient-x": "gradient-x 6s ease infinite",
        "gradient-y": "gradient-y 6s ease infinite",
        "gradient-xy": "gradient-xy 6s ease infinite",
        shimmer: "shimmer 2s infinite ease-in-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(400%)" },
        },
      },
    },
  },
  plugins: [],
};
