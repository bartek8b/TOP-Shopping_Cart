import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';
import CartIcon from '../../assets/icons/cart-shopping-solid-full.svg?react';

export const Nav = () => {
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
          {/* To be replaced with svg icon */}
          Shop
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          aria-label="Go to cart"
        >
          <CartIcon aria-hidden="true" />
        </NavLink>
      </div>
    </nav>
  );
};
