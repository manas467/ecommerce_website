import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import Productlist from '../utilis/ProductList/Productlist'

const Products=()=> {

    const { productApi } = useContext(GlobalState);
  const { products } = productApi;

  console.log('Products from context:', products);
  console.log('Full state:', productApi);

  return (
    <div className='products'>
    {
        products.map(product=>{
        return <Productlist key={product.id} product={product}/>
        })
    }
    </div>
  )
}

export default Products