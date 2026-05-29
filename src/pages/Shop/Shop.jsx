import { useState, useEffect } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import styles from './Shop.module.css';

// Custom hook
const useData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Server error');
        }
        return response.json();
      })
      .then((actualData) => setData(actualData))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { data, error, loading };
};

export const Shop = () => {
  const { data, error, loading } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (loading) return <Loader />;
  if (error) return <ErrorMessage type="fetch" />;

  const uniqueCategories = [];

  data.forEach((product) => {
    if (!uniqueCategories.includes(product.category)) {
      uniqueCategories.push(product.category);
    }
  });

  function handleSelect(e) {
    setSelectedCategory(e.target.value);
  }

  return (
    <div className={styles.shopContainer}>
      <label htmlFor="category">
        Category:
        <select
          id="category"
          name="selectedCategory"
          value={selectedCategory}
          onChange={handleSelect}
        >
          <option value="All">All</option>
          {uniqueCategories.map((c) => (
            <option key={c} value={c}>
              {capitalizeFirstLetter(c)}
            </option>
          ))}
        </select>
      </label>

      <section>
        {data.map(
          (product) =>
            (product.category === selectedCategory ||
              selectedCategory === 'All') && (
              <ProductCard key={product.id} product={product} />
            ),
        )}
      </section>
    </div>
  );
};
