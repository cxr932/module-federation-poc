// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Suspense } from 'react';
import NxWelcome from './nx-welcome';
import './app.module.css';

// note here how we're importing from 'prism_applets/*', just like we defined in the host app's vite config
const ColorVisualizer = React.lazy(() => import('prism_applets/ColorVisualizer'));
const ColorWall = React.lazy(() => import('prism_applets/ColorWall'));

export function App() {
  return (
    <div>
      <NxWelcome title="random host application" />
      <div style={{ 'border': '5px solid blue', 'padding': '10px' }}>
        <Suspense fallback={<>Loading....</>}>
          <ColorVisualizer subtitle={'loaded from host app'} />
        </Suspense>

        <Suspense fallback={<>Loading....</>}>
          <ColorWall subtitle={'loaded from host app'} />
        </Suspense>
      </div>

    </div>
  );
}

export default App;
