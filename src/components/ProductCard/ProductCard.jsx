import { useState } from 'react';
import { useCart } from '../CartProvider/useCart';
import MinusIcon from '../../assets/icons/circle-minus-solid-full.svg?react';
import PlusIcon from '../../assets/icons/circle-plus-solid-full.svg?react';
import AddToCartIcon from '../../assets/icons/cart-plus-solid-full.svg?react';

export const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  function handleIncrease() {
    setQuantity((prev) => prev + 1);
  }

  function handleDecrease() {
    setQuantity((prev) => Math.max(1, prev - 1));
  }

  function handleAddToCart() {
    addToCart(product, quantity);
  }

  return (
    <article className="card">
      <h3>{product.title}</h3>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <div className="purchaseContainer">
        <p>{`$ ${product.price.toFixed(2)}`}</p>
        <div className="inputContainer">
          <button
            type="button"
            className="decrease"
            onClick={handleDecrease}
            aria-label="Decrease quantity"
          >
            <MinusIcon aria-hidden="true" />
          </button>
          {/* Quantity input */}
          <input
            type="number"
            value={quantity}
            readOnly
            onChange={() => {}}
            min="1"
            aria-label="Quantity"
          />
          <button
            type="button"
            className="increase"
            onClick={handleIncrease}
            aria-label="Increase quantity"
          >
            <PlusIcon aria-hidden="true" />
          </button>
        </div>
      </div>
      <button type="button" onClick={handleAddToCart}>
        Add to cart <AddToCartIcon aria-hidden="true" />
      </button>
    </article>
  );
};
