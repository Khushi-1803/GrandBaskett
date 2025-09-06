
import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
  const { products } = useAppContext();
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
      <p className='mt-6 text-xl sm:text-2xl md:text-3xl font-medium text-center sm:text-left'>
        Best Sellers
      </p>

      <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6 mt-6'>
        {products.filter((product) => product.inStock).slice(0, 5).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  )
}

export default BestSeller

