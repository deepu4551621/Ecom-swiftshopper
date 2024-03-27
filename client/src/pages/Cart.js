import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GiShoppingCart } from "react-icons/gi";

import UserCart from '../components/userCart';

const Cart = () => {
  const userId = useSelector((state) => state.user.userId);

  const [data, setData] = useState({}); // State to store fetched data

  useEffect(() => {
    // Fetch cart data only if userId exists
    if (userId) {
      fetchItemIntoCart();
    }
  }, [userId]); // Call useEffect whenever userId changes

  const fetchItemIntoCart = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/carts/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }
      const data = await response.json();
      // Process fetched data
      setData(data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        <GiShoppingCart />
        <span>My Cart</span>
      </h1>
      {userId ? (
        <UserCart cartData={data} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h1>Please login to see the cart</h1>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
