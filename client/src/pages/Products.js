import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import '../pageStyles/products.css';
function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('https://dummyjson.com/products?skip=0&limit=100')
      .then(res => res.json())
      .then(data => {
        // Set products state with fetched data
        setProducts(data.products);
        // console.log('p:',data)
      });
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      <h2 className='product-category'>All Products</h2>
    <div className="products-container">
      {currentProducts.map((product, index) => (
        <div key={index} className="product-card"> 
            <Card product={product}/>
        </div> 
      ))} 
    </div>
    <div className='pagination'>
    <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map((pageNumber) => (
            <li className={`page-item ${pageNumber + 1 === currentPage ? 'active' : ''}`} key={pageNumber + 1}>
              <button
                className="page-link"
                onClick={() => handlePageChange(pageNumber + 1)}
              >
                {pageNumber + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === Math.ceil(products.length / productsPerPage) ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(products.length / productsPerPage)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      </div>
    </div>
  );
}

export default Products;
