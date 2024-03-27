import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pageStyles/login.css';
import Cookies from 'js-cookie'
import toast from 'react-hot-toast';
const Login = () => {
  const navigate = useNavigate();
  
  const [allUsers, setUsers] = useState([]);
  useEffect(() => {
   const fetchUsers=async()=>{
   await fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then(data => {
      // console.log('users', data);
      setUsers(data.users);
    });
   }
   fetchUsers();
  }, []);
  
  
  // ***********************************************
  const handleSubmit = async (id) => {
        // Show loading toast
        const loadingToastId = toast.loading('Logging in...');
       if(id){
        try {
          const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
          });
      
          // Check if the response is ok
          if (response.ok) {
            // Parse response body as JSON
            const data = await response.json();
            const {token, userData} =data;
            const userId =userData.id;
            
            //  Set the authentication token as a cookie
             Cookies.set('authToken', token, { expires: 7 });
             
              toast.dismiss(loadingToastId)
              // Show success message
          toast.success('User logged in successfully.',{
            duration:2000
          });
             // Navigate to the home page
             navigate('/', { state: { authToken: token, userId } });
            // console.log("token:", token);
            // console.log('userData:', userData)
    
          } else {
           
            console.error('Error:', response.statusText);
          }
        } catch (error) {
          toast.error(`Error:backend server not running:', ${error}`);
        }
       }
  };

  return (
    <div>
      <h1 style={{textAlign:'center'}}>Select any user to login</h1>
      <div style={{display:'flex', flexWrap:'wrap'}}>
      {allUsers.map((user, index) => (
        <div className="login-container" key={index}>
          <h3 style={{textAlign:'center'}}> {user.firstName} {user.lastName}</h3>
          <div className="icon">
            <button type="submit" onClick={()=>handleSubmit(index+1)}>
              <img src={user.image}width={50} height={50} alt="user" />
              <h3>{user.username}</h3>
              <p>Age:{user.age}</p>
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Login;
