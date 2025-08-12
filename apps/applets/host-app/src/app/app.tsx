// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Suspense } from 'react';
import NxWelcome from './nx-welcome';
import './app.module.css';

const RemoteComponent = React.lazy(() => import('remote_app/App'));
const RemoteComponent2 = React.lazy(() => import('remote_app/App2'));

export function App() {
  return (
    <div>
      <NxWelcome title="host-app" />
      <Suspense fallback={<>Loading....</>}>
        <RemoteComponent2 />
      </Suspense>

      <Suspense fallback={<>Loading....</>}>
        <RemoteComponent />
      </Suspense>

    </div>
  );
}

export default App;
