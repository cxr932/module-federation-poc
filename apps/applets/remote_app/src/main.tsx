import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import ColorVisualizer from './color-visualizer/app';
import ColorWall from './color-wall/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <h1>This is the remote app's own internal application. It's embedding 2 of its applets here:</h1>
    <div style={{ 'border': '5px dotted red', 'padding': '10px' }}>
      <ColorVisualizer />
      <ColorWall />
    </div>
  </StrictMode>
);
