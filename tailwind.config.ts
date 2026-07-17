import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F5F1",
        ink: {
          DEFAULT: "#1C2230",
          soft: "#4A5164",
          faint: "#8A8F9E",
        },
        accent: {
          DEFAULT: "#0F3D3E",
          50: "#EAF1F0",
          100: "#D2E2E0",
          300: "#7CA9A7",
          500: "#0F3D3E",
          600: "#0C3132",
          700: "#0A2728",
        },
        line: "#E4E1DA",
        error: "#B3261E",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(28,34,48,0.04), 0 4px 12px rgba(28,34,48,0.06)",
        panel: "0 2px 8px rgba(28,34,48,0.06), 0 8px 24px rgba(28,34,48,0.08)",
      },
      borderRadius: {
        md2: "10px",
      },
    },
  },
  plugins: [],
};

export default config;
