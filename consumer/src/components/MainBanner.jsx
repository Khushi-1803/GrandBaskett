
import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className="relative w-full">
      {/* Desktop Banner */}
      <img 
        src={assets.main_banner_bg} 
        alt="banner" 
        className="w-full hidden md:block object-cover"
      />

      {/* Mobile Banner */}
      <img 
        src={assets.main_banner_bg_sm} 
        alt="banner" 
        className="w-full block md:hidden object-cover"
      />

      {/* Banner Content */}
      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center px-4 sm:px-6 md:pl-18 lg:pl-24 pb-16 sm:pb-20 md:pb-0'>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-[90%] sm:max-w-[80%] md:max-w-80 lg:max-w-[42rem] leading-snug sm:leading-tight lg:leading-[3.5rem] bg-gradient-to-r from-green-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent animate-gradient-x">
          Straight from farm to your kitchen!
        </h1>

        <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-6 font-medium'>
          {/* Shop Now (Mobile and Desktop) */}
          <Link 
            to={"/products"} 
            className='group flex items-center gap-2 px-6 sm:px-8 py-3 bg-primary hover:bg-primary-dull transition rounded text-white text-sm sm:text-base'
          >
            Shop now
            <img 
              className='md:hidden transition group-focus:translate-x-1' 
              src={assets.white_arrow_icon} 
              alt="arrow"
            />
          </Link>

          {/* Explore Deals (Desktop Only) */}
          <Link 
            to={"/products"} 
            className='group hidden md:flex items-center gap-2 px-8 py-3 bg-white hover:bg-gray-100 transition-all duration-300 rounded-lg shadow-lg hover:scale-105 text-sm sm:text-base'
          >
            Explore deals
            <img 
              className='transition group-hover:translate-x-1' 
              src={assets.black_arrow_icon} 
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainBanner


