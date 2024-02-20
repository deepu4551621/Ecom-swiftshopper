import React from 'react';
import { useSelector } from 'react-redux';
const Cart = () => {
  const item = useSelector((state)=>state.cart.initialState);
  const items=  [item];
  return (
    <div className="cart">
      <h2>Cart id {items}</h2>
      {items?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
