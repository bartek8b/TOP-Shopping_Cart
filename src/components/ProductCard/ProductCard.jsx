import { useState } from 'react';
import { useCart } from '../CartProvider/useCart';
import MinusIcon from '../../assets/icons/circle-minus-solid-full.svg?react';
import PlusIcon from '../../assets/icons/circle-plus-solid-full.svg?react';
import AddToCartIcon from '../../assets/icons/cart-plus-solid-full.svg?react';
import styles from './ProductCard.module.css';

export const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(0);
  const { addToCart } = useCart();

  function handleIncrease() {
    setQuantity((prev) => prev + 1);
  }

  function handleDecrease() {
    setQuantity((prev) => Math.max(1, prev - 1));
  }

  function handleAddToCart() {
    addToCart(product, quantity);
    setQuantity(1);
    setAdded(quantity);

    setTimeout(() => {
      setAdded(0);
    }, 1500);
  }

  const titleWords = product.title.split(' ');
  const shortTitle =
    titleWords.length > 4 ? titleWords.slice(0, 4).join(' ') : product.title;

  return (
    <article className={styles.card}>
      <h3 className={styles.productName}>{shortTitle}</h3>
      <img src={product.image} alt={product.title} />
      <p className={styles.description}>{product.description}</p>
      <div className={styles.purchaseContainer}>
        {!added && (
          <p className={styles.price}>{`$ ${product.price.toFixed(2)}`}</p>
        )}
        {added > 0 && <p className={styles.added}>{added} added to cart!</p>}

        <div className={styles.inputContainer}>
          <button
            type="button"
            className={styles.plusMinus}
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
            min="1"
            aria-label="Quantity"
            tabIndex={-1}
          />
          <button
            type="button"
            className={styles.plusMinus}
            onClick={handleIncrease}
            aria-label="Increase quantity"
          >
            <PlusIcon aria-hidden="true" />
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={handleAddToCart}
        className={styles.addBtn}
        disabled={added}
      >
        Add to cart <AddToCartIcon aria-hidden="true" />
      </button>
    </article>
  );
};
