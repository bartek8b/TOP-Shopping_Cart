import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Landing } from './Landing';

describe('Landing page', () => {
  it('renders main heading and shopping link', () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: /gocart/i, level: 1 }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /go shopping/i }),
    ).toHaveAttribute('href', '/shop');
  });
});