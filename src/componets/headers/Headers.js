import React from 'react'

import { MdOutlineMenu } from "react-icons/md";
import {Link} from 'react-router-dom'
import { MdClose } from "react-icons/md";
import { HiShoppingCart } from "react-icons/hi";

const Headers = () => {
  return (
   <header>
     <div className='menu'>
     <MdOutlineMenu width={30} />
     </div>
   <div className='logo'>
      <h1>
        <Link to ='/'>Mahop</Link>
      </h1>
   </div>
      <ul>
        <li><Link to ='/'>Products</Link></li>
        <li><Link to ='/login'>login or register</Link></li>
        <li><MdClose className='menu' /></li>

      </ul>
      <div className='cart-icon'>
        <span>0</span>
        <Link><HiShoppingCart /></Link>
      </div>



   </header>
  )
}

export default Headers