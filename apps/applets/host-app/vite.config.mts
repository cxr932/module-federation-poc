/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import federation, { Shared } from '@originjs/vite-plugin-federation';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/apps/host-app',
  server: {
    port: 5000,
    host: 'localhost',
  },
  preview: {
    port: 5000,
    host: 'localhost',
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  plugins: [
    react(),
    federation({
      /**
       * This is how a Real Application (assembled with vite, webpack, etc) could include our applets as
       * "Official" remote modules without having to install them as npm packages.
       * This is less of our focus than embed-v2 since we need facets to fill that embed role, but it's still
       * important to understand how we can use it going forward.
       */
      name: 'random-host-app-including-this-like-a-module',
      remotes: {
        // this is the name of the module that the app can internally import from... it's defined here
        // this whole host application will be able to refer to is as `prism_applets/*`
        prism_applets: 'http://localhost:5001/assets/all-prism-applets.js',
      },
      // This bit is not necessary for the host app, but it's here to show how you can share dependencies
      // with the remote app. If you want to share dependencies, uncomment this section.
      // shared: {
      //   react: {
      //     singleton: true,
      //     requiredVersion: '18.2.0',
      //   },
      //   'react-dom': {
      //     singleton: true,
      //     requiredVersion: '18.2.0',
      //   },
      // } as Shared,
    }),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: '../dist/host-app',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    target: 'esnext',
  },
});
