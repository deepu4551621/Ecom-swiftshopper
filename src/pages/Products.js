import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import '../pageStyles/products.css';

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        // Set products state with fetched data
        setProducts(data.products);
        // console.log('p:',data)
      });
  }, []);
  return (
    <div>
      <h2 className='product-category'>All Products</h2>
    <div className="products-container">
      {products.map((product, index) => (
        <div key={index} className="product-card"> 
            <Card product={product}/>
        </div> 
      ))} 
    </div>
    </div>
  );
}

export default Products;
