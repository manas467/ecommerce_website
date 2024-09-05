import {  createContext, useState } from "react";
import ProductsApi from "./API/ProductsApi";

export const GlobalState=createContext()

export const DataProvider=({children}) =>{
  const [token,setToken]=useState(false)

  const state={
    token: [token,setToken],
    productApi  :ProductsApi()
  }
  
   return(
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
   ) 

}