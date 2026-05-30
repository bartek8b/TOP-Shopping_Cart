import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../CartProvider/CartProvider';
import styles from './Nav.module.css';

vi.mock('../../assets/icons/cart-shopping-solid-full.svg?react', () => ({
  default: (props) => <svg data-testid="cart-icon" {...props} />,
}));

vi.mock('../CartProvider/useCart', () => ({
  useCart: () => ({
    cartCount: 3,
  }),
}));

import { Nav } from './Nav';

describe('Nav', () => {
  function renderNav(initialRoute = '/') {
    return render(
      <CartProvider>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Nav />
        </MemoryRouter>
      </CartProvider>,
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

  it('renders cart badge as a polite live region when cart has items', () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>,
    );

    const badge = screen.getByText('3');

    expect(badge).toHaveAttribute('aria-live', 'polite');
    expect(badge).toHaveAttribute('aria-atomic', 'true');
  });
});
