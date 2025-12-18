import React, { createContext, useContext, useEffect, useState } from "react";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);      
  const [cartLength,setCartLength]=useState(0)
  const [wishLength,setWishLength]=useState(0)
  return (
    <CartContext.Provider value={{cartLength,setCartLength,wishLength,setWishLength,cartList,setCartList}}>
      {children}
    </CartContext.Provider>
  );
};


