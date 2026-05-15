import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

export const Nav = () => {
  return (
    <nav>
      <NavLink to="/" end>
        GoCart
      </NavLink>

      {/* Wrapper used to align the logo to the left and the links to the right */}
      <div>
        <NavLink
          to="/shop"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Shop
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          Cart
        </NavLink>
      </div>
    </nav>
  );
};
