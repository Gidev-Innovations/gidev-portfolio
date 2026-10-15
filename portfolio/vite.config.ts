import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import {fileURLToPath} from "node:url";

export default defineConfig({
  plugins: [
    tailwindcss(),
    // Replaces @vitejs/plugin-react: the React Router plugin includes React
    // support and adds the build-time pre-rendering step.
    reactRouter(),
  ],
    server: {
      // Rebuilding while `npm run dev` runs locks these files on Windows and crashes the watcher.
      watch: { ignored: ['**/build/**', '**/test-results/**', '**/audits/**'] },
    },
    resolve: {
      alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
})
