/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import federation, { Shared } from '@originjs/vite-plugin-federation';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/apps/remote_app',
  server: {
    port: 5001,
    host: 'localhost',
    cors: true,
  },
  preview: {
    port: 5001,
    host: 'localhost',
    cors: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  plugins: [
    react(),
    federation({
      name: 'prism-applets', // <-- this gets used in the filenames of all the generated chunks (other than the main one, which uses filename below)
      filename: 'all-prism-applets.js', // <-- filename of the main chunk. this is ~equivalent to facets' manifest file (inserted into facets' embed.js) containing the chunk dependency graph
      exposes: { // <-- each `exposes` entry is an applet/facet which can be imported by a host using this name, just like any other module
        './ColorVisualizer': './src/color-visualizer/app.tsx',
        './ColorWall': './src/color-wall/app.tsx',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '18.2.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '18.2.0',
        },
      } as Shared,
    }),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: '../dist/remote_app',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    target: 'esnext',
  },
});
