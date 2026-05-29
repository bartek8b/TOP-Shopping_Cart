import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CartProvider } from '../CartProvider/CartProvider';

vi.mock('../../assets/icons/circle-minus-solid-full.svg?react', () => ({
  default: (props) => <svg data-testid="minus-icon" {...props} />,
}));

vi.mock('../../assets/icons/circle-plus-solid-full.svg?react', () => ({
  default: (props) => <svg data-testid="plus-icon" {...props} />,
}));

vi.mock('../../assets/icons/cart-plus-solid-full.svg?react', () => ({
  default: (props) => <svg data-testid="cart-plus-icon" {...props} />,
}));

import { ProductCard } from './ProductCard';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  image: 'https://example.com/product.jpg',
  description: 'This is a test product description.',
  price: 19.99,
  category: 'electronics',
};

function renderProductCard() {
  return render(
    <CartProvider>
      <ProductCard product={mockProduct} />
    </CartProvider>,
  );
}

describe('ProductCard', () => {
  it('renders product title, image, description, and price', () => {
    renderProductCard();

    expect(
      screen.getByRole('heading', { name: /test product/i, level: 3 }),
    ).toBeInTheDocument();

    expect(screen.getByRole('img', { name: /test product/i })).toHaveAttribute(
      'src',
      mockProduct.image,
    );

    expect(
      screen.getByText(/this is a test product description\./i),
    ).toBeInTheDocument();

    expect(screen.getByText('$ 19.99')).toBeInTheDocument();
  });

  it('renders quantity controls and add to cart button', () => {
    renderProductCard();

    expect(
      screen.getByRole('button', { name: /decrease quantity/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('spinbutton', { name: /quantity/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /increase quantity/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /add to cart/i }),
    ).toBeInTheDocument();
  });

  it('starts with quantity equal to 1', () => {
    renderProductCard();

    expect(screen.getByRole('spinbutton', { name: /quantity/i })).toHaveValue(
      1,
    );
  });

  it('increases quantity when increase button is clicked', async () => {
    const user = userEvent.setup();
    renderProductCard();

    await user.click(
      screen.getByRole('button', { name: /increase quantity/i }),
    );

    expect(screen.getByRole('spinbutton', { name: /quantity/i })).toHaveValue(
      2,
    );
  });

  it('decreases quantity when decrease button is clicked', async () => {
    const user = userEvent.setup();
    renderProductCard();

    await user.click(
      screen.getByRole('button', { name: /increase quantity/i }),
    );
    await user.click(
      screen.getByRole('button', { name: /decrease quantity/i }),
    );

    expect(screen.getByRole('spinbutton', { name: /quantity/i })).toHaveValue(
      1,
    );
  });

  it('does not decrease quantity below 1', async () => {
    const user = userEvent.setup();
    renderProductCard();

    await user.click(
      screen.getByRole('button', { name: /decrease quantity/i }),
    );

    expect(screen.getByRole('spinbutton', { name: /quantity/i })).toHaveValue(
      1,
    );
  });

  it('resets quantity to 1 after adding product to cart', async () => {
    const user = userEvent.setup();
    renderProductCard();

    await user.click(
      screen.getByRole('button', { name: /increase quantity/i }),
    );
    await user.click(
      screen.getByRole('button', { name: /increase quantity/i }),
    );

    expect(screen.getByRole('spinbutton', { name: /quantity/i })).toHaveValue(
      3,
    );

    await user.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(screen.getByRole('spinbutton', { name: /quantity/i })).toHaveValue(
      1,
    );
  });
});
