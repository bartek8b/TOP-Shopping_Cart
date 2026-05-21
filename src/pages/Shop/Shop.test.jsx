import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CartProvider } from '../../components/CartProvider/CartProvider';
import { Shop } from './Shop';

globalThis.fetch = vi.fn();

describe('Shop Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('filters products by selected category', async () => {
    const user = userEvent.setup();

    const mockProducts = [
      {
        id: 1,
        title: 'Golden ring',
        price: 99.99,
        category: 'jewelery',
        image: 'https://src.com/ring.jpg',
        description: 'Beautiful ring',
      },
      {
        id: 2,
        title: 'Laptop bag',
        price: 49.99,
        category: "men's clothing",
        image: 'https://src.com/bag.jpg',
        description: 'Useful bag',
      },
    ];

    fetch.mockResolvedValue({
      status: 200,
      json: async () => mockProducts,
    });

    render(
      <CartProvider>
        <Shop />
      </CartProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Golden ring')).toBeInTheDocument();
      expect(screen.getByText('Laptop bag')).toBeInTheDocument();
    });

    const select = screen.getByRole('combobox', { name: /category/i });
    await user.selectOptions(select, 'jewelery');

    expect(screen.getByText('Golden ring')).toBeInTheDocument();
    expect(screen.queryByText('Laptop bag')).not.toBeInTheDocument();
  });
});