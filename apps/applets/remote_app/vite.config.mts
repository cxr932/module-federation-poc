/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import federation, { Shared } from '@originjs/vite-plugin-federation';
// @ts-expect-error TS doesn't like this import, but it works
import { dependencies } from '../../../package.json'

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
  // optimizeDeps: {
  //   include: ['react', 'react-dom'],
  // },
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
          requiredVersion: dependencies.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom'],
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
    manifest: true,
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    // we'll likely need a second config that builds to an es2018 target
    // target: 'chrome89', // not "esnext" because we need to support older browsers like Safari 14
    target: 'esnext', // not "esnext" because we need to support older browsers like Safari 14
  },
});
