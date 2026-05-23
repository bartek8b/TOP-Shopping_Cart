import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CartItem } from './CartItem';

const mockAddToCart = vi.fn();
const mockRemoveFromCart = vi.fn();
const mockDeleteFromCart = vi.fn();

vi.mock('../CartProvider/useCart', () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
    removeFromCart: mockRemoveFromCart,
    deleteFromCart: mockDeleteFromCart,
  }),
}));

describe('CartItem', () => {
  const product = {
    id: 1,
    title: 'Keyboard',
    image: 'https://example.com/keyboard.jpg',
    quantity: 2,
    price: 99.99,
  };

  beforeEach(() => {
    mockAddToCart.mockClear();
    mockRemoveFromCart.mockClear();
    mockDeleteFromCart.mockClear();
  });

  it('renders product data', () => {
    render(<CartItem product={product} />);

    expect(screen.getByText(/keyboard/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /keyboard/i })).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', { name: /quantity of keyboard/i }),
    ).toHaveValue(2);
  });

  it('calls cart actions when buttons are clicked', async () => {
    const user = userEvent.setup();

    render(<CartItem product={product} />);

    await user.click(
      screen.getByRole('button', { name: /increase quantity of keyboard/i }),
    );
    await user.click(
      screen.getByRole('button', { name: /decrease quantity of keyboard/i }),
    );
    await user.click(
      screen.getByRole('button', { name: /delete keyboard from cart/i }),
    );

    expect(mockAddToCart).toHaveBeenCalledWith(product, 1);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(product, 1);
    expect(mockDeleteFromCart).toHaveBeenCalledWith(product.id);
  });
});
