import { useState, useEffect } from 'react';

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

  // TODO: Add loader & error msg
  if (loading) return <p>Loading</p>;
  if (error) return <p>A network error was encountered</p>;

  const uniqueCategories = [];

  data.forEach((product) => {
    if (!uniqueCategories.includes(product.category)) {
      // TODO: Add capitals
      uniqueCategories.push(product.category);
    }
  });

  function handleSelect(e) {
    setSelectedCategory(e.target.value);
  }

  return (
    <>
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
              {c}
            </option>
          ))}
        </select>
      </label>

      <section>
        {data.map(
          (product) =>
            (product.category === selectedCategory ||
              selectedCategory === 'All') && (
              <div key={product.id} className="product-card">
                <div>{product.title}</div>
                <p>{product.category}</p>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: '100px' }}
                />
                <p>$ {product.price}</p>
                <p>{product.description}</p>
              </div>
            ),
        )}
      </section>
    </>
  );
};
