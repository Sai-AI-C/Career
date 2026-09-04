import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders header and branch selection UI', () => {
  render(<App />);
  const titleElement = screen.getByText(/CAREER NAVIGATOR/i);
  expect(titleElement).toBeInTheDocument();

  const initButton = screen.getByText(/INITIALIZE TRANSCRIPT ENTRY/i);
  expect(initButton).toBeInTheDocument();
});

test('navigates to transcript entry step upon initialize click', () => {
  render(<App />);
  const initButton = screen.getByText(/INITIALIZE TRANSCRIPT ENTRY/i);
  fireEvent.click(initButton);

  const transcriptHeader = screen.getByText(/TRANSCRIPT ENTRY/i);
  expect(transcriptHeader).toBeInTheDocument();
});
