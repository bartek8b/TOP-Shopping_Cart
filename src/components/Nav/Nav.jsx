import { NavLink } from 'react-router-dom';
import { useCart } from '../CartProvider/useCart';
import styles from './Nav.module.css';
import CartIcon from '../../assets/icons/cart-shopping-solid-full.svg?react';

export const Nav = () => {
  const { cartCount } = useCart();

  return (
    <nav>
      <NavLink to="/" end aria-label="Go to Home page">
        GoCart
      </NavLink>

      {/* Wrapper used to align the logo to the left and the links to the right */}
      <div>
        <NavLink
          to="/shop"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          aria-label="Go to shop"
        >
          Shop
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          aria-label="Go to cart"
        >
          <div className={styles.iconWrapper}>
            <CartIcon aria-hidden="true" />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </div>
        </NavLink>
      </div>
    </nav>
  );
};
