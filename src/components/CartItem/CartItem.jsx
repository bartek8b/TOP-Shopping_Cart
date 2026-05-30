import { useCart } from '../CartProvider/useCart';
import MinusIcon from '../../assets/icons/circle-minus-solid-full.svg?react';
import PlusIcon from '../../assets/icons/circle-plus-solid-full.svg?react';
import TrashIcon from '../../assets/icons/trash-can-solid-full.svg?react';
import styles from './CartItem.module.css';

export const CartItem = ({ product }) => {
  const { addToCart, removeFromCart, deleteFromCart } = useCart();

  const titleWords = product.title.split(' ');
  const shortTitle =
    titleWords.length > 4 ? titleWords.slice(0, 4).join(' ') : product.title;

  return (
    <article>
      <div className="descriptionContainer">
        <img src={product.image} alt={product.title} />
        <p>{shortTitle}</p>
      </div>
      <div className="inputContainer">
        <button
          type="button"
          className="decrease"
          onClick={() => removeFromCart(product, 1)}
          aria-label={`Decrease quantity of ${product.title}`}
        >
          <MinusIcon aria-hidden="true" />
        </button>
        <input
          type="number"
          value={product.quantity}
          readOnly
          min="1"
          aria-label={`Quantity of ${product.title}`}
        />
        <button
          type="button"
          className="increase"
          onClick={() => addToCart(product, 1)}
          aria-label={`Increase quantity of ${product.title}`}
        >
          <PlusIcon aria-hidden="true" />
        </button>
        <button
          type="button"
          className="delete"
          onClick={() => deleteFromCart(product.id)}
          aria-label={`Delete ${product.title} from cart`}
        >
          <TrashIcon aria-hidden="true" />
        </button>
      </div>
    </article>
  );
};
