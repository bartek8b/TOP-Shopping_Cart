import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { CartProvider } from './CartProvider';
import { useCart } from './useCart';

function TestComponent() {
  const {
    cart,
    cartCount,
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart,
  } = useCart();

  const keyboard = { id: 1, name: 'Keyboard', price: 100 };
  const mouse = { id: 2, name: 'Mouse', price: 50 };

  return (
    <>
      <p>Unique items: {cart.length}</p>

      <p>Total items: {cartCount}</p>

      <p>First item quantity: {cart[0]?.quantity ?? 0}</p>

      <button onClick={() => addToCart(keyboard, 2)}>Add 2 keyboards</button>

      <button onClick={() => addToCart(keyboard, 1)}>Add 1 keyboard</button>

      <button onClick={() => addToCart(mouse, 2)}>Add 2 mice</button>

      <button onClick={() => removeFromCart(keyboard, 1)}>
        Remove 1 keyboard
      </button>

      <button onClick={() => removeFromCart(keyboard, 3)}>
        Remove 3 keyboards
      </button>

      <button onClick={() => deleteFromCart(1)}>Remove all keyboards</button>

      <button onClick={clearCart}>Clear cart</button>
    </>
  );
}

describe('CartProvider component', () => {
  it('starts with an empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    expect(screen.getByText(/unique items: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/total items: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/first item quantity: 0/i)).toBeInTheDocument();
  });

  it('adds a new item with quantity', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    await user.click(screen.getByRole('button', { name: /add 2 keyboards/i }));

    expect(screen.getByText(/unique items: 1/i)).toBeInTheDocument();

    expect(screen.getByText(/total items: 2/i)).toBeInTheDocument();

    expect(screen.getByText(/first item quantity: 2/i)).toBeInTheDocument();
  });

  it('increases quantity for an existing item instead of adding a duplicate entry', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    await user.click(screen.getByRole('button', { name: /add 2 keyboards/i }));
    await user.click(screen.getByRole('button', { name: /add 1 keyboard/i }));

    expect(screen.getByText(/unique items: 1/i)).toBeInTheDocument();

    expect(screen.getByText(/total items: 3/i)).toBeInTheDocument();

    expect(screen.getByText(/first item quantity: 3/i)).toBeInTheDocument();
  });

  it('adds another unique product and updates total item count correctly', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    await user.click(screen.getByRole('button', { name: /add 2 keyboards/i }));
    await user.click(screen.getByRole('button', { name: /add 2 mice/i }));

    expect(screen.getByText(/unique items: 2/i)).toBeInTheDocument();

    expect(screen.getByText(/total items: 4/i)).toBeInTheDocument();

    expect(screen.getByText(/first item quantity: 2/i)).toBeInTheDocument();
  });

  it('decreases quantity for an existing item', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    await user.click(screen.getByRole('button', { name: /add 2 keyboards/i }));
    await user.click(
      screen.getByRole('button', { name: /remove 1 keyboard/i }),
    );

    expect(screen.getByText(/unique items: 1/i)).toBeInTheDocument();

    expect(screen.getByText(/total items: 1/i)).toBeInTheDocument();

    expect(screen.getByText(/first item quantity: 1/i)).toBeInTheDocument();
  });

  it('removes an item completely when quantity reaches zero or below', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    await user.click(screen.getByRole('button', { name: /add 2 keyboards/i }));
    await user.click(
      screen.getByRole('button', { name: /remove 3 keyboards/i }),
    );

    expect(screen.getByText(/unique items: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/total items: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/first item quantity: 0/i)).toBeInTheDocument();
  });

  it('deletes an item from the cart when the delete button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    await user.click(screen.getByRole('button', { name: /add 2 keyboards/i }));
    await user.click(
      screen.getByRole('button', { name: /remove all keyboards/i }),
    );

    expect(screen.getByText(/unique items: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/total items: 0/i)).toBeInTheDocument();
  });

  it('clears the cart', async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    );

    await user.click(screen.getByRole('button', { name: /add 2 keyboards/i }));
    await user.click(screen.getByRole('button', { name: /add 2 mice/i }));
    await user.click(screen.getByRole('button', { name: /clear cart/i }));

    expect(screen.getByText(/unique items: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/total items: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/first item quantity: 0/i)).toBeInTheDocument();
  });
});
