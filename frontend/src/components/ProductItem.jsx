import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

const ProductItem = ({id,image,name,price}) => {
    
    const {currency} = useContext(ShopContext);

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      className="text-gray-700 cursor-pointer"
      to={`/product/${id}`}
    >
      {/* Image wrapper with fixed size */}
      <div className="w-full h-48 overflow-hidden flex items-center justify-center bg-gray-100">
        <img
          className="max-h-full max-w-full object-contain hover:scale-105 transition ease-in-out duration-300"
          src={image[0]}
          alt={name}
        />
      </div>

      {/* Text */}
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
   </Link>
  )
}

export default ProductItem
