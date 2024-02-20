import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import AllProducts from "./Products";
import { CiSearch } from "react-icons/ci";
import { Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  // const uid = location.state.uid;
  const { category } = useParams();
  // console.log('uid', uid);
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(null);
  const [query, setQuery] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`https://dummyjson.com/products/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLimit(data.limit);
        // console.log('search', data);
      });
  };
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  useEffect(() => {
    //fetch category
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        // console.log('categoryData:', data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, [category, query]);
  return (
    <div>
      <Form className="d-flex " onSubmit={handleSubmit}>
        <Form.Control
          value={query}
          onChange={handleChange}
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button
          variant="outline-success"
          type="submit"
          style={styles.searchbtn}
        >
          <CiSearch size={30} />
        </Button>
      </Form>

      {query ? (
        <h1 style={styles.category}> Result({limit})</h1>
      ) : (
        <h1 style={styles.category}>{category}</h1>
      )}
      <div className="products-container">
        {category ? (
          products?.map((product, index) => (
            <div key={index} className="product-card">
              <Card product={product}  />
            </div>
          ))
        ) : query ? (
          <div className="product-card">
            <Card product={products}  />
          </div>
        ) : (
          <AllProducts  />
        )}
      </div>
    </div>
  );
}
const styles = {
  category: {
    textAlign: "center",
    padding: 10,
    borderRadius: 5,
  },
  searchbtn: {
    width: 40,
    height: 40,
    margin: 0,
    padding: 0,
  },
};
export default Home;
