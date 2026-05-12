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

  if (loading) return <p>Loading</p>;
  if (error) return <p>A network error was encountered</p>;

  return (
    <div>
      {data.map((product) => (
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
      ))}
    </div>
  );
};
