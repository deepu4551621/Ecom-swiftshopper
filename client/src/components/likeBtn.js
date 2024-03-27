import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { addToWishlist, removeFromWishlist } from '../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
const LikeButton = ({ item }) => {
  const dispatch=useDispatch()
  const likedItems =useSelector(state=>state.cart.wishlist)

  const handleLike = (item, e) => {
    e.preventDefault();
    console.log('likedItem', item);
    const itemId = item.id;
    
    if (likedItems[itemId]) {
      dispatch(removeFromWishlist({ itemId }));
    } else {
      dispatch(addToWishlist({ itemId, item }));
    }
  };
   // Check if item is liked
   const isLiked = likedItems[item.id] !== undefined;

  return (
    <div  onClick={(e)=>handleLike(item, e)}>
      <FaHeart size={20} color={isLiked ? 'red' : 'silver'} />
    </div>
  );
};

export default LikeButton;
