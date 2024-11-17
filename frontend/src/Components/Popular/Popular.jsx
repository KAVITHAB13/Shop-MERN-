import React, { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../Item/Item';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/popularinwomen');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setPopularProducts(data);
      } catch (err) {
        console.error('Error fetching popular products:', err);
        setError('Failed to load popular products');
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      {error && <p className="error">{error}</p>}
      <div className="popular-item">
        {popularProducts.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
    </div>
  );
};

export default Popular;
