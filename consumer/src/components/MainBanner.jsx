// import React from 'react'
// import {assets} from '../assets/assets'

// const MainBanner = () => {
//   return (
//     <div className='relative'>
//         <img src={assets.main_banner_bg} alt='banner' className='w-full hidden md:block'/>
//         <img src={assets.main_banner_bg_sm} alt='banner' className='w-full  md:block'/>
//     </div>
//   )
// }

// export default MainBanner  

import React from 'react'
import {assets} from '../assets/assets'
import { Link } from 'react-router-dom'


const MainBanner = () => {
  return (
    
<div className="relative">
  {/* Desktop Banner */}
  <img 
    src={assets.main_banner_bg} 
    alt="banner" 
    className="w-full hidden md:block"
  />

  {/* Mobile Banner */}
  <img 
    src={assets.main_banner_bg_sm} 
    alt="banner" 
    className="w-full block md:hidden"
  />

  <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
    {/* <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>Straight from farm to your kitchen!</h1> */}
  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-[3.5rem] 
bg-gradient-to-r from-green-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent animate-gradient-x">
  Straight from farm to your kitchen!
</h1>

  <div className='flex items-center mt-6 font-medium'>
    <Link to={"/products"} className='group flex items-center gap-2 px-2 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'>Shop now
    <img className='md:hidden transition group-focus:translate-x-1' src={assets.white_arrow_icon} alt="arrow"/>
    </Link>

    <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-9  py-3  cursor-pointer bg-white hover:bg-gray-100 transition-all duration-300 rounded-lg shadow-lg hover:scale-105 ml-6'>Explore deals
    <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt="arrow"/>
    </Link>
  </div>
  </div>
</div>

  )
}

export default MainBanner

