
import Card from 'react-bootstrap/Card';
import LikeButton from './likeBtn';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import '../pageStyles/card.css'
import { GiShoppingCart } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addToCart} from '../features/cart/cartSlice'
import toast from 'react-hot-toast';
import { useState } from 'react';
function BasicExample({ product, uid }) {
 const dispatch =useDispatch();
  const navigate =useNavigate()
  const [item, setItem]=useState([]);
  const isLongTitle = product.title&&product?.title?.length > 15;
  const titleClassName = isLongTitle ? 'product-title long-title' : 'product-title';
  const handleCheckOut=(e)=>{
    e.preventDefault();
    navigate('/cart')
    alert('order placed')
  }
  const handleAdd=async(id , e)=>{
    e.preventDefault();
      // Show loading toast
  const loadingToastId = toast.loading('Adding item to cart...');
  try {
    // Fetch item details
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const item = await response.json();

    // Add a 5-second delay
    setTimeout(() => {
      // Dispatch addToCart action to add the item to the cart
      dispatch(addToCart({ item, quantity: 1 }));

      // Dismiss loading toast after action is completed
      toast.dismiss(loadingToastId);
    }, 1000); // 5-second delay
  } catch (error) {
    console.error('Error adding item to cart:', error);
    // Show error toast if fetching item fails
    toast.error('Error adding item to cart. Please try again later.');
    // Dismiss loading toast on error
    toast.dismiss(loadingToastId);
  }
 
  }
  return (
    <div>
    <Card style={{border:'none', padding:5, height:330}}>
      <Link to={`/products/${product.id}`} state={{uid}}   style={{textDecoration:'none',color: 'inherit'}}>
      <Card.Img variant="top" src={product.thumbnail} className='thumbnail' />
      <div className='likeContainer'>
      <LikeButton item={product}/>
      </div>
      <Card.Body>
        <div className="product-info">
          <h2 className={titleClassName}>{isLongTitle?`${product.title.slice(0, 30)}...`:product.title}</h2>
          {/* <div className="s-description scrollable-description">
          <p className="card-text">{product.description}</p>
        </div> */}
          <div className="product-price">${product.price}</div>
          {/* <div style={{display:'flex', justifyContent:'space-between'}}>
            <p className="product-rating">Rating: {product.rating}</p>
            <p className="product-stock">In Stock: {product.stock}</p>
          </div> */}
         <div style={{display:'flex',padding:10, justifyContent:'space-evenly'}}>
         <Button variant="outline-primary" onClick={(e)=>handleAdd(product.id, e)}>
          <GiShoppingCart size={25}/>
         </Button>
          <Button variant="outline-success" onClick={handleCheckOut}>Buy</Button>
         </div>
        </div>
      </Card.Body>
      </Link>
    </Card>
    </div>
  );
}

export default BasicExample;