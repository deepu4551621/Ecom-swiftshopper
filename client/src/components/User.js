import React, {useEffect, useState} from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function User() {
  const uData=useSelector(state=>state.user.userData)
  const navigate =useNavigate();

    const handleClick = () => {
      if (uData?.firstName) {
        navigate('/about', {state:{uData}});
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
            uData?.image?(
              <img src={uData?.image} alt="User" style={styles.image} />
            ):(<FaRegUserCircle style={styles.image}/>  )
           }
          </div>
        <div style={styles.userInfo}>
          <p style={styles.userName}>Hello, {uData?.firstName ? uData.firstName : "Customer"}</p>
          <p style={styles.userEmail}>{uData && uData?.email}</p>
         
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