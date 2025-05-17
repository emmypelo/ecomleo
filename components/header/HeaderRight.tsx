import React from 'react'
import SearchBar from './SearchBar';
import CartItem from './CartIcon';
import Register from './Register';

const HeaderRight = () => {
  return <div className="w-auto h-full md:w-1/3 flex items-center justify-end gap-5">
    <SearchBar/>
    <CartItem itemCount={9}/>
    <Register/>
  </div>;
}

export default HeaderRight