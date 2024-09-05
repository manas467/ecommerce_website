import React, { useEffect, useState } from 'react'
import axios from 'axios' 


const ProductsApi=()=>{


  const[products,setProducts]=useState([])

  const GetProducts= async()=>{
    const res= await axios.get('/api/Products')
    console.log(res.data);
    return res.data
  }
  
  useEffect(()=>{
    GetProducts()
  },[])


  return {
    products:[products,setProducts]
  }
}

export default ProductsApi