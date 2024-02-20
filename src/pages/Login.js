import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pageStyles/login.css';
import { login } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
const Login = () => {
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const [allUsers, setUsers] = useState([]);
  useEffect(() => {
   const fetchUsers=async()=>{
   await fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then(data => {
      console.log('users', data);
      setUsers(data.users);
    });
   }
   fetchUsers();
  }, []);
  const handleSubmit = async (id) => {
    try {
      let username;
      let password;

      // Find the user in the list of users
      const user = allUsers.find(user => user.id === id);
      if (user) {
        username = user.username;
        password = user.password;
      } else {
        // Set default username and password
        username = 'kminchelle';
        password = '0lelplR';
      }

      // Make the login API request
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { id: userId, token, ...userData } = data;
        
        // Dispatch the login action with user data
        dispatch(login({ userId, userData }));

        // Navigate to the home page
        navigate('/', { state: { authToken: token, userId } });

        console.log('Login successful. User ID:', userId);
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
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
  );
};

export default Login;
