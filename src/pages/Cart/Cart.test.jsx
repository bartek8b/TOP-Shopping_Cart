import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Cart } from './Cart';

vi.mock('../../components/CartProvider/useCart', () => ({
  useCart: vi.fn(),
}));

vi.mock('../../components/CartItem/CartItem', () => ({
  CartItem: ({ product }) => <div>{product.title}</div>,
}));

import { useCart } from '../../components/CartProvider/useCart';

describe('Cart', () => {
  it('renders empty cart message', () => {
    useCart.mockReturnValue({
      cart: [],
      clearCart: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    expect(screen.getByText(/the cart is empty/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /checkout/i })).toBeDisabled();
  });

  it('renders cart items and total price', () => {
    useCart.mockReturnValue({
      cart: [
        {
          id: 1,
          title: 'Keyboard',
          price: 100,
          quantity: 2,
        },
        {
          id: 2,
          title: 'Mouse',
          price: 50,
          quantity: 1,
        },
      ],
      clearCart: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    expect(screen.getByText(/keyboard/i)).toBeInTheDocument();
    expect(screen.getByText(/mouse/i)).toBeInTheDocument();
    expect(screen.getByText(/total:/i)).toBeInTheDocument();
    expect(screen.getByText('$ 250.00')).toBeInTheDocument();
  });

  it('shows thank-you message after checkout click', async () => {
    const user = userEvent.setup();

    useCart.mockReturnValue({
      cart: [
        {
          id: 1,
          title: 'Keyboard',
          price: 100,
          quantity: 2,
        },
      ],
      clearCart: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: /checkout/i }));

    expect(screen.getByText(/thank you for using demo/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /go back to home page/i }),
    ).toBeInTheDocument();
  });
});
