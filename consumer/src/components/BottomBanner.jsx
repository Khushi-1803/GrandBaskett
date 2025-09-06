// import React from 'react'
// import {assets, features} from '../assets/assets'

// const BottomBanner = () => {
//   return (
//     <div className='relative mt-24'>
//         <img src={assets.bottom_banner_image} alt='banner' className='w-full hidden md:block'/>
//         <img src={assets.bottom_banner_image_sm} alt='banner' className='w-full  md:hidden'/>
//          <div className='absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24'>
//           <div>
//             <h1 className='text-2xl md:text-3xl font-semibold text-primary mb-6'>Why we are the best?</h1>
//             {features.map((feature,index)=>(
//               <div key={index} className='flex items-center gap-4 mt-2'>
//                 <img src={feature.icon} alt={feature.title} className='md:w-11 w:9'/>
//                 <div>
//                   <h3 className='text-lg md:text-xl font-semibold'>{feature.title}</h3>
//                   <p className='text-gray-500/70 text-xs md:text-sm'>{feature.description}</p>
//                 </div>

//               </div>
//             ))}
//           </div>

//          </div>
//     </div>

   
//   )
// }

// export default BottomBanner


import React from "react"; 
import { motion } from "framer-motion";
import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <div className="relative mt-24 px-4 sm:px-6 md:px-8"> {/* Added responsive horizontal padding */}
      
      {/* Banner Images */}
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="w-full hidden md:block object-cover"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="w-full md:hidden object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-10 md:pt-0 md:pr-24 px-4 sm:px-8">
        {/* Responsive padding added inside overlay for smaller screens */}

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-lg"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-4 text-center md:text-left">
            Why we are the best?
          </h1>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start sm:items-center gap-3 sm:gap-4 bg-white/70 hover:bg-primary/10 p-3 rounded-xl transition-all shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <motion.img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-8 sm:w-9 md:w-11 flex-shrink-0"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BottomBanner;
