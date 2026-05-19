import { useState } from 'react';
import MinusIcon from '../../assets/icons/circle-minus-solid-full.svg?react';
import PlusIcon from '../../assets/icons/circle-plus-solid-full.svg?react';
import AddToCartIcon from '../../assets/icons/cart-plus-solid-full.svg?react';

export const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  function handleIncrease() {
    setQuantity((prev) => prev + 1);
  }

  function handleDecrease() {
    setQuantity((prev) => Math.max(1, prev - 1));
  }

  return (
    <div className="card">
      <h3>{product.title}</h3>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <div className="purchaseContainer">
        <p>{`$ ${Number(product.price.toFixed(2))}`}</p>
        <div className="inputContainer">
          <button
            type="button"
            className="decrease"
            onClick={handleDecrease}
            aria-label="Decrease quantity"
          >
            <MinusIcon />
          </button>
          {/* Quantity input */}
          <input
            type="number"
            value={quantity}
            readOnly
            min="1"
            aria-label="Quantity"
          />
          <button
            type="button"
            className="increase"
            onClick={handleIncrease}
            aria-label="Increase quantity"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
      <button type="button">
        Add to cart <AddToCartIcon />
      </button>
    </div>
  );
};
