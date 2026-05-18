import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '../CartProvider/CartProvider';

vi.mock('../../assets/icons/cart-shopping-solid-full.svg?react', () => ({
  default: (props) => <svg data-testid="cart-icon" {...props} />,
}));

import { Layout } from './Layout';

describe('Layout Component', () => {
  it('renders navigation, outlet content, and footer', () => {
    render(
      <CartProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={<div data-testid="test-child">Test content</div>}
              />
            </Route>
          </Routes>
        </MemoryRouter>
      </CartProvider>,
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /go to home page/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/footer/i)).toBeInTheDocument();
  });
});
