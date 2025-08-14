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
  cacheDir: '../../../node_modules/.vite/apps/host-app-bare',
  server: {
    port: 5099,
    host: 'localhost',
  },
  preview: {
    port: 5099,
    host: 'localhost',
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  plugins: [
    react(),
    federation({
      name: 'embed-maker-host',
      remotes: {
        // this is the name of the module that the app can internally import from... it's defined here
        // this whole host application will be able to refer to is as `prism_applets/*`
        prism_applets: 'http://localhost:5001/assets/all-prism-applets.js',
      },
      // This bit is not necessary for the host app, but it's here to show how you can share dependencies
      // with the remote app. If you want to share dependencies, uncomment this section.
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
    outDir: '../dist/host-app-bare',
    // lib: {
    //   entry: ['./src/mod.ts'],
    //   name: 'embed-poc-host-app-bare',
    //   fileName: (format, entryName) => `my-lib-${entryName}.${format}.js`,
    // },
    // rollupOptions: {
    //   output: {
    //     inlineDynamicImports: false, // Explicitly set to false or remove this line
    //     // manualChunks: {
    //     //   // ... your manualChunks configuration
    //     // },
    //   },
    // },
    manifest: true,
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    // we should try to target es2017 here, but we need a polyfill for top level await
    // using chrome89 (same as remote) in the meantime
    // target: 'chrome89',
    target: 'esnext',
  },
});
