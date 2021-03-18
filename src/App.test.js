import { render, screen } from '@testing-library/react';
import App from './components/App/App';

// Test app here (jest)

//example
test('some test desc', () => {
  render(<App />);
  const linkElement = screen.getByText(/some text/i);
  expect(linkElement).toBeInTheDocument();
});
