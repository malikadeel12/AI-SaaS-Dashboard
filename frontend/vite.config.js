import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        darkMode: "class", // ✅ dark mode enabled
        content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
        theme: { extend: {} },
        plugins: [],
      },
    }),
  ],
});
