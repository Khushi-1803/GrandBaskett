
import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-semibold text-gray-800">Categories</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
            className="group cursor-pointer relative overflow-hidden rounded-xl flex flex-col justify-center items-center p-5 shadow-sm border border-gray-100 hover:shadow-lg transition duration-300"
            style={{ backgroundColor: category.bgColor }}
          >
            {/* Image with hover effect */}
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white shadow-inner group-hover:scale-105 transition-transform duration-300">
              <img
                className="w-14 h-14 object-contain"
                src={category.image}
                alt={category.text}
              />
            </div>

            {/* Category Text */}
            <p className="mt-3 text-sm font-medium text-gray-800 group-hover:text-gray-900 transition">
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


