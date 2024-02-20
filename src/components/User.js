import React, {useEffect, useState} from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function User({authToken}) {
  const navigate =useNavigate();
  const [userData, setUserData]=useState({});

  useEffect(() => {
    if (authToken) {
      fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          setUserData(data);
          // console.log('authenticated:', data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
   
  }, [authToken]); 
    const handleClick = () => {
      if (userData?.firstName) {
        navigate('/about', {state:{userData}});
    } else {
      navigate('/login');
    }
  };
  return (
    <div style={styles.topHeader}>
    <div  style={styles.userDiv}>
      <button onClick={handleClick} style={styles.link}>    
          <div style={styles.imageContainer}>
           {
            userData?.image?(
              <img src={userData?.image} alt="User" style={styles.image} />
            ):(<FaRegUserCircle style={styles.image}/>  )
           }
          </div>
        <div style={styles.userInfo}>
          <p style={styles.userName}>Hello, {userData?.firstName ? userData.firstName : "Customer"}</p>
          <p style={styles.userEmail}>{userData && userData?.email}</p>
        </div>
        </button>
    </div>
  </div>
  )
}
const styles = {
    topHeader:{
        borderRadius:10,
        backgroundColor: '#d4d4bd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userDiv: {
      display: 'flex',
      alignItems: 'center',
      margin:10
    },
    link: {
      display:'flex',
      border:'none',
      textDecoration: 'none',
      color: 'inherit',
      backgroundColor:'transparent'
    },
    imageContainer: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      overflow: 'hidden',
      marginRight: '10px',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    userIcon: {
      width: '50px',
      height: '50px',
      marginRight: '10px',
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    userEmail: {
      fontSize: '12px',
      color: '#888',
    },
  };
export default User