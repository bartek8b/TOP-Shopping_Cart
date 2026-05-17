import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import styles from './Nav.module.css';

vi.mock('../../assets/icons/cart-shopping-solid-full.svg?react', () => ({
  default: (props) => <svg data-testid="cart-icon" {...props} />,
}));

import { Nav } from './Nav';

describe('Nav', () => {
  function renderNav(initialRoute = '/') {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Nav />
      </MemoryRouter>,
    );
  }

  it('renders all navigation links', () => {
    renderNav();

    expect(
      screen.getByRole('link', { name: /go to home page/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /go to shop/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /go to cart/i }),
    ).toBeInTheDocument();
  });

  it('links point to correct routes', () => {
    renderNav();

    expect(
      screen.getByRole('link', { name: /go to home page/i }),
    ).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /go to shop/i })).toHaveAttribute(
      'href',
      '/shop',
    );
    expect(screen.getByRole('link', { name: /go to cart/i })).toHaveAttribute(
      'href',
      '/cart',
    );
  });

  it('applies active class to the current route', () => {
    renderNav('/shop');

    expect(screen.getByRole('link', { name: /go to shop/i })).toHaveClass(
      styles.active,
    );
    expect(screen.getByRole('link', { name: /go to cart/i })).not.toHaveClass(
      styles.active,
    );
  });
});