import { Link } from 'react-router-dom';
import BagIcon from '../../assets/icons/bag-shopping-solid-full.svg?react';
import CodeIcon from '../../assets/icons/file-code-solid-full.svg?react';
import styles from './Landing.module.css';

export const Landing = () => {
  return (
    <div className={styles.container}>
      <section className="splitLayout">
        <h1 className={styles.logoContainer}>
          <span className={styles.logoAccent}>Go</span>Cart
        </h1>
        <div className="secondChild">
          <p>
            GoCart is a lightweight e‑commerce demo SPA built to showcase
            modern React patterns. Browse products, add items to your cart, and
            explore a complete shopping flow.
          </p>
          <Link to="/shop" className={styles.cta}>
            <BagIcon aria-hidden="true" />
            Shop
          </Link>
        </div>
      </section>

      <section className="monoLayout">
        <h2>Components</h2>
        <div className="badgesContainer">
          <div className="componentBadge">
            <span className="componentSymbol">{'<L />'}</span>
            <span>Landing</span>
          </div>
          <div className="componentBadge">
            <span className="componentSymbol">{'<S />'}</span>
            <span>Shop</span>
          </div>
          <div className="componentBadge">
            <span className="componentSymbol">{'<C />'}</span>
            <span>Cart</span>
          </div>
        </div>
      </section>

      <section className="monoLayout">
        <h2>Check the code</h2>
        <a
          href="https://github.com/bartek8b/TOP-Shopping_Cart"
          target="_blank"
          rel="noreferrer"
          className={styles.cta}
        >
          <CodeIcon aria-hidden="true" />
          Repo
        </a>
      </section>
    </div>
  );
};
