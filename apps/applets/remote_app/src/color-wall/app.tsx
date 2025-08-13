// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import NxWelcome from './nx-welcome';

export interface Props {
  subtitle?: string | undefined
}

export function App({ subtitle = '' }: Props) {
  return (
    <div style={{ 'border': '2px dotted red', 'padding': '10px' }}>
      <NxWelcome title={`Color Wall ${subtitle}`} />
    </div>
  );
}

export default App;
