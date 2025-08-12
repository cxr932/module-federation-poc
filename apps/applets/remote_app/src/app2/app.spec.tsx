import { render } from '@testing-library/react';

import App from './app';

describe('App2', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Welcome remote_app/gi)).toBeTruthy();
  });
});
