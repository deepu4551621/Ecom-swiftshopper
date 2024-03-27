import React from 'react';
import '../pageStyles/main.css'
import { Link } from 'react-router-dom';

const Sidebar = ({categories}) => {
  return (
    <div>
        <h1 className='categories'>Categories</h1>
    <div className="sidebar">
      <div className='linkContainer'>
        <Link className='linkAnchor' to='/'>Allproducts</Link></div>
     
      <ul className='ul-slider'>
        {categories?.map((category, index) => (
          <li key={index} className='linkContainer' >
            <Link className='linkAnchor' to={`categorie/${category}`}>
                {category}</Link>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};


export default Sidebar;
