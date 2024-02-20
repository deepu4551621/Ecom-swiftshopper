import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../pageStyles/about.css'
import { IoIosArrowBack } from "react-icons/io";
const AboutPage = () => {
  const location = useLocation();
  const history = useNavigate();
  const userData = location.state && location.state.userData;
// console.log('about:',userData)
  const handleBack = () => {
    history(-1); // Navigate back to the previous page
  };
  return (
    <div style={{marginBottom:50}}>
        <div className='top-header'>
      <button onClick={handleBack} className='backbutton'><IoIosArrowBack/>Go Back</button>
        </div>
     {
      userData?(
        <div className="user-data-container">
        <h2>User Information</h2>
        <div className="section">
          <h3>Personal Information</h3>
          <ul>
            <li><strong>Name:</strong> {userData?.firstName} {userData?.lastName}</li>
            <li><strong>Gender:</strong> {userData?.gender}</li>
            <li><strong>Date of Birth:</strong> {userData?.birthDate}</li>
            {/* Add more personal information fields as needed */}
          </ul>
        </div>
        <div className="section">
          <h3>Contact Information</h3>
          <ul>
            <li><strong>Email:</strong> {userData?.email}</li>
            <li><strong>Phone:</strong> {userData?.phone}</li>
            {/* Add more contact information fields as needed */}
          </ul>
        </div>
        <div className="section">
          <h3>Address</h3>
          <ul>
            <li><strong>Street Address:</strong> {userData?.address.address}</li>
            <li><strong>City:</strong> {userData?.address.city}</li>
            <li><strong>State:</strong> {userData?.address.state}</li>
            {/* Add more address fields as needed */}
          </ul>
        </div>
        {/* Add more sections for additional user data */}
         </div>
      ):(
        <div style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <h2>User info not available</h2>
          <h1>Login please!</h1>
          </div>
      )
     } 
      

    </div>
  );
};
export default AboutPage;
