import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), dts({ rollupTypes: true })],
  base: "/",
  server: {
    open: true
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'AppBootstrapWithAuth',
      fileName: 'xstate-react-login'
    },
    rollupOptions: {
      external: [
        'react', 
        'react-dom',
        '@emotion/react',
        '@emotion/styled',
        '@fontsource/roboto',
        '@mui/material',
        '@xstate/react',
        'axios',
        'final-form',
        'react-final-form',
        'react-router-dom',
        'xstate'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDom',
          '@xstate/react': 'xstateReact',
          'xstate': 'xstate',
          'axios': 'axios',
          '@mui/material': 'mui',
          'react-final-form': 'reactFinalForm'
        },
      },
    },
  },
})
