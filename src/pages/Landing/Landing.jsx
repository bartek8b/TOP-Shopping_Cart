import { Link } from 'react-router-dom';
import BagIcon from '../../assets/icons/bag-shopping-solid-full.svg?react';
import CodeIcon from '../../assets/icons/file-code-solid-full.svg?react';

export const Landing = () => {
  return (
    <>
      <section className="splitLayout">
        <h1 className="firstChild">GoCart</h1>
        <div className="secondChild">
          <p>
            GoCart is a lightweight e‑commerce prototype built to showcase
            modern React patterns. Browse products, add items to your cart, and
            explore a complete shopping flow.
          </p>
          <Link to="/shop">
            <BagIcon aria-hidden="true" />
            Go shopping
          </Link>
        </div>
      </section>

      <section>
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

      <section>
        <div>Check the code</div>
        <a
          href="https://github.com/bartek8b/TOP-Shopping_Cart"
          target="_blank"
          rel="noreferrer"
        >
          <CodeIcon aria-hidden="true" />
          Repo
        </a>
      </section>
    </>
  );
};