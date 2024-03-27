// src/features/cart/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Assuming you have items/products in your state
  wishlist: {},
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { item, quantity } = action.payload;// Assuming payload contains the product object
      
      const isProductAlreadyInCart = state.items.includes(i => i.id === item.id);

      // console.log('pid', productIdToAdd, 'isexist', isProductAlreadyInCart, 'product', productToAdd)
      if (!isProductAlreadyInCart) {
        state.items.push({ ...item, quantity });
      }
     
    },
    incrementQuantity: (state, action) => {
      const { itemId } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === itemId);
      console.log('index valur',itemIndex)
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity++; // Update quantity immutably
      }
    },
    decrementQuantity: (state, action) => {
      const { itemId } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === itemId);
      if (itemIndex !== -1 && state.items[itemIndex].quantity > 1) {
        state.items[itemIndex].quantity--; // Update quantity immutably
      }
    },
    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload.productId;
      state.items = state.items.filter((product) => product.id !== productIdToRemove);
    },
    removeCart:(state=>{
      return [];
    }),
    addToWishlist: (state, action) => {
      const { itemId, item } = action.payload;
      state.wishlist[itemId] = item;
    },
    removeFromWishlist: (state, action) => {
      const { itemId } = action.payload;
      delete state.wishlist[itemId];
    },
  },
});

export const { addToCart, removeFromCart, removeCart, addToWishlist, removeFromWishlist
,incrementQuantity, decrementQuantity} = cartSlice.actions;

export default cartSlice.reducer;
