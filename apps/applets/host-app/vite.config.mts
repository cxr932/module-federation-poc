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
      name: 'host-app',
      // filename
      filename: 'zong.js',
      remotes: {
        // this is the name of the module that the app can internally import from... it's created here
        // there's a matching generic type for it in src/type.d.ts that matches this name as well
        // it should match the name in the remote app's vite.config.mts
        // some things use "app_name@http://blablabla/remoteEntry.js"... what's up with that? "module specifier"?
        remote_app: 'http://localhost:5001/assets/remoteEntry.js',
      },
      // This bit is not necessary for the host app, but it's here to show how you can share dependencies
      // with the remote app. If you want to share dependencies, uncomment this section.
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
    outDir: '../dist/host-app',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    target: 'esnext',
  },
});
