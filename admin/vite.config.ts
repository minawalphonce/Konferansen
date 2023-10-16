import fs from "fs";
import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    "outDir": "./dist",
    "emptyOutDir": true,
  },
  plugins: [
    react(),
    {
      "name": "copy memory",
      "buildStart": () => {
        fs.copyFileSync(
          path.resolve(__dirname, "../app/store/memory.json"),
          path.resolve(__dirname, "./src/assets/memory.json")
        )
      }
    }
  ],
})
