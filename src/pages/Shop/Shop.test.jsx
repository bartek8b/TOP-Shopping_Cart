import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Shop } from './Shop';

globalThis.fetch = vi.fn();

describe('Shop Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('displays products after successfull data fetch', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Golden ring',
        price: 99.99,
        category: 'jewelery',
        image: 'https://src.com/img.jpg',
        description: 'Beautiful ring',
      },
    ];

    fetch.mockResolvedValue({
      status: 200,
      json: async () => mockProducts,
    });

    render(<Shop />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Golden ring')).toBeInTheDocument();
    });

    expect(screen.getByText('$ 99.99')).toBeInTheDocument();
    expect(screen.getByAltText('Golden ring')).toBeInTheDocument();
  });

  it('displays error when fetch failed', async () => {
    fetch.mockResolvedValue({ status: 500 });

    render(<Shop />);

    await waitFor(() => {
      expect(
        screen.getByText(/A network error was encountered/i),
      ).toBeInTheDocument();
    });
  });
});
