import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';
import { describe, it, expect } from 'vitest';

describe('ErrorMessage Component', () => {
  it('renders default error message with no prop passed', () => {
    render(<ErrorMessage />);
    expect(
      screen.getByText(/something went wrong\. please try again later/i),
    ).toBeInTheDocument();
  });
  it('renders proper error message with "fetch" prop passed', () => {
    render(<ErrorMessage type="fetch" />);
    expect(
      screen.getByText(/unable to load products right now/i),
    ).toBeInTheDocument();
  });
  it('renders proper error message with "route" prop passed', () => {
    render(<ErrorMessage type="route" />);
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
