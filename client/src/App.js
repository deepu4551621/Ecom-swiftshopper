import React, {useEffect, useState} from 'react'
import Main from './HomeLayout/Main';
import {Toaster} from 'react-hot-toast'
function App() {
  const [categories, setCategories]=useState([]);
    useEffect(() => {
      //fetch category
        fetch(`https://dummyjson.com/products/categories`)
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                // console.log('categories:', data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);
  return (
    <div>
       <Main categories={categories}/>
       <Toaster/>
    </div>
  )
}

export default App