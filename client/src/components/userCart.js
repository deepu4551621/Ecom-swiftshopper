import { useState, useEffect } from "react";
import "../pageStyles/cart.css";
import { RiDeleteBinLine } from "react-icons/ri";
import toast from "react-hot-toast";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";

const UserCart = ({ cartData }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items);

  const [item, setItem] = useState("");
  useEffect(() => {

    cartItem.map((item) => {
      setItem(item);
    });
  }, [cartItem]);
  const handleOrder = () => {
    console.log("order button pressed");
  };
  const handleDelete = async (productId) => {
 // Show loading toast
 const loadingToastId = toast.loading('Deleting item from cart...');

 // Add a 5-second delay
 setTimeout(() => {
   // Dispatch the removeFromCart action to remove the item from the cart
   dispatch(removeFromCart({ productId }));

   // Dismiss the loading toast after the action is completed
   toast.dismiss(loadingToastId);
 }, 3000); // 5-second delay
  };
  const IncrementQ = (itemId) => {
    dispatch(incrementQuantity({ itemId }));
  };
  const DecrementQ = (itemId) => {
    dispatch(decrementQuantity({ itemId }));
  };

  
  return (
    <div>
      {cartItem.length>0 && (
        <div className="cart-container">
          <div className="cart-item">
            {cartItem?.map((product, index) => (
              <div className="item-details" key={index}>
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: 20,
                    objectFit: "cover",
                  }}
                  src={product?.thumbnail}
                  alt="itemimg"
                />
                <div className="item-div">
                  <h3>{product?.title}</h3>
                  <div className="item-div2">
                    <p>Price: ${product?.price}</p>
                    <p>
                      <button
                        className="qbtn"
                        onClick={() => DecrementQ(product.id)}
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        className="qbtn"
                        onClick={() => IncrementQ(product.id)}
                      >
                        +
                      </button>
                    </p>
                    <p>Total: ${product.quantity * product.price}</p>
                  </div>
                  <div className="totalbox">
                    <button
                      onClick={() => handleDelete(product.id)}
                      style={{ border: "none", padding: 10 }}
                    >
                      <RiDeleteBinLine size={30} color="red" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <p>Grand Total: ${item.price*item.quantity}</p>
            <p>Total Products: {cartItem.length}</p>
            <p>Total Quantity: {item.quantity}</p>
            <button className="obtn" onClick={handleOrder}>
              Place an Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCart;
