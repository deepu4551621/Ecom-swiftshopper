import React from 'react';

import { Link } from 'react-router-dom';

const Sidebar = ({categories}) => {
  return (
    <div className="sidebar">
      <h2 style={styles.categories}>Categories</h2>
      <ul style={{listStyle:'none', margin:0, padding:0}}>
        {categories?.map((category, index) => (
          <li key={index} style={styles.linkContainer} >
            <Link style={styles.list} to={`categorie/${category}`}>
                {category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
const styles ={
    categories:{
        textAlign:'center',
        borderBottom:'4px solid grey'
    },
    linkContainer:{
        backgroundColor:'#f0f0f0',
        padding:10,
        margin:10,
      textAlign:'center',
      borderRadius:10
    },
   list:{
    textDecoration:'none',
   },
     
}

export default Sidebar;
