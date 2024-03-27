import { useState } from 'react';

const CheckoutPage = () => {
  // State variables to store form data
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions such as sending form data to backend for processing
    // Redirect to a confirmation page or display a success message
    console.log('Form submitted:', { shippingInfo, paymentInfo });
  };

  // Function to handle changes in shipping information
  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  // Function to handle changes in payment information
  const handlePaymentChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        {/* Shipping Information */}
        <fieldset>
          <legend>Shipping Information</legend>
          <div>
            <label htmlFor="fullName">Full Name:</label>
            <input type="text" id="fullName" name="fullName" value={shippingInfo.fullName} onChange={handleShippingChange} required />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" value={shippingInfo.address} onChange={handleShippingChange} required />
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" value={shippingInfo.city} onChange={handleShippingChange} required />
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <input type="text" id="country" name="country" value={shippingInfo.country} onChange={handleShippingChange} required />
          </div>
          <div>
            <label htmlFor="postalCode">Postal Code:</label>
            <input type="text" id="postalCode" name="postalCode" value={shippingInfo.postalCode} onChange={handleShippingChange} required />
          </div>
        </fieldset>

        {/* Payment Information */}
        <fieldset>
          <legend>Payment Information</legend>
          <div>
            <label htmlFor="cardNumber">Card Number:</label>
            <input type="text" id="cardNumber" name="cardNumber" value={paymentInfo.cardNumber} onChange={handlePaymentChange} required />
          </div>
          <div>
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input type="text" id="expiryDate" name="expiryDate" value={paymentInfo.expiryDate} onChange={handlePaymentChange} required />
          </div>
          <div>
            <label htmlFor="cvv">CVV:</label>
            <input type="text" id="cvv" name="cvv" value={paymentInfo.cvv} onChange={handlePaymentChange} required />
          </div>
        </fieldset>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
