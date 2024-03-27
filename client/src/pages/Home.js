import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import AllProducts from "./Products";
import { CiSearch } from "react-icons/ci";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { login } from "../features/user/userSlice";
import {toast} from 'react-hot-toast'
function Home() {
  const { category } = useParams();
  const navigate =useNavigate();
  const dispatch=useDispatch()
  const isAuthorized=useSelector(state=>state.user.isAuthenticated)
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
        console.log('search', data.products);
      });
  };
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const authorization = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: token }
      });
      if (response.ok) {
        const Data = await response.json();
      const userId=Data.userData.id;
      const {userData, success }=Data
      // console.log("d",Data)
       // Dispatch the login action with user data
       if(success){
        toast.success("user Authorized", {
          duration:2000
        })
       }
       dispatch(login({success, userId, userData }));
      }
      
    } catch (error) {
      console.log(`authorization error: ${error.message}`)
    }
  };
  
  useEffect(() => {
   const token =  Cookies.get('authToken')
   if(!token){
   navigate('/login')
   }else{
 //  auth method
 if (!isAuthorized) {
  // Run authorization method only if not authorized already
  authorization(token);
}
   }
 
    //fetch category
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        // console.log('categoryData:', data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, [category, query, isAuthorized]);
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
       <AllProducts/>
          
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
