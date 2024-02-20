import React from 'react';
import Sidebar from './Sidebar';
import MainBar from './MainBar';
import NavbarComponent from '../components/Navbar';
import '../pageStyles/main.css'
import { useLocation } from 'react-router-dom';

const MainComponent = ({ categories }) => {
  const location =useLocation();
  const authToken =location?.state?.authToken;
  const uid = location?.state?.uid;
  console.log('uid',uid);
  return (
    <div>
    <NavbarComponent authToken={authToken}/>
    <div className="container">
      <Sidebar  categories={categories} />
      <MainBar  uid={uid} />
    </div>
    </div>
  );
};

export default MainComponent;
