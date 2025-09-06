
import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"> {/* Added responsive padding */}
      <p className="text-2xl md:text-3xl font-semibold text-gray-800 text-center sm:text-left">
        Categories
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-4 sm:gap-5 md:gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
            className="group cursor-pointer relative overflow-hidden rounded-xl flex flex-col justify-center items-center p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-lg transition duration-300"
            style={{ backgroundColor: category.bgColor }}
          >
            {/* Image with hover effect */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-white shadow-inner group-hover:scale-105 transition-transform duration-300">
              <img
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                src={category.image}
                alt={category.text}
              />
            </div>

            {/* Category Text */}
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-gray-800 group-hover:text-gray-900 transition text-center">
              {category.text}
            </p>

            {/* Dynamic hover overlay */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
