import { useCart } from '../../components/CartProvider/useCart';
import { CartItem } from '../../components/CartItem/CartItem';
import RecycleIcon from '../../assets/icons/recycle-solid-full.svg?react';
import CheckOutIcon from '../../assets/icons/circle-dollar-to-slot-solid-full.svg?react';
import { useState } from 'react';
import { Link } from 'react-router';

export const Cart = () => {
  const { cart, clearCart } = useCart();
  const [checkOut, setCheckOut] = useState(false);

  const handleCheckOut = () => {
    setCheckOut(true);
  };

  const resetCheckOut = () => {
    setCheckOut(false);
  };

  const total = cart.reduce(
    (sum, article) => sum + article.price * article.quantity,
    0,
  );

  if (!checkOut) {
    return (
      <div className="splitLayout">
        <section>
          {cart.length === 0 ? (
            <p>The cart is empty</p>
          ) : (
            cart.map((product) => (
              <CartItem key={product.id} product={product} />
            ))
          )}
        </section>
        <section>
          <div>
            <p>Total price: {`$ ${total}`}</p>
            <button
              type="button"
              className="checkout"
              onClick={handleCheckOut}
              disabled={cart.length === 0}
            >
              Checkout <CheckOutIcon aria-hidden="true" />
            </button>
          </div>
          <button type="button" className="increase" onClick={clearCart}>
            Delete all
            <RecycleIcon aria-hidden="true" />
          </button>
        </section>
      </div>
    );
  }

  return (
    <section>
      <p>Thank you for using demo</p>
      <Link
        to="/"
        onClick={() => {
          resetCheckOut();
          clearCart();
        }}
      >
        Go back to home page
      </Link>
    </section>
  );
};
