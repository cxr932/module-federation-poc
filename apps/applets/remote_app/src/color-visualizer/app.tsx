// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import NxWelcome from './nx-welcome';

export function App({ subtitle = '' }) {
  return (
    <div style={{ 'border': '2px dotted red', 'padding': '10px' }}>
      <NxWelcome title={`Color Visualizer ${subtitle}`} />
    </div>
  );
}

export default App;
