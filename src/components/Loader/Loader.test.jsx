import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';
import { describe, it, expect } from 'vitest';

describe('ErrorMessage Component', () => {
  it('renders properly', () => {
    render(<Loader />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
