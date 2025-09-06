// import React from 'react'

// const Contact = () => {
//   return (
//     <>
//     <div className='flex flex-row m-auto justify-center items-center mt-16'>
//         <div>
//             <img className='h-80'src='https://i.pinimg.com/736x/24/ff/cf/24ffcfb1e082b236f6898007351d7f76.jpg'/>
//         </div>
//     <div className='w-80 h-80 bg-primary-dull p-5 m-5'>
//         <h1 className='text-xl font-semibold mb-5'>Thank you for contacting us! A member of our support team will get back to you within 24–48 hours.</h1>


//         <p>Instagram: @grandbasket</p>
//         <p>Facebook: facebook.com/grandbasket</p>
//         <p>WhatsApp: +1 (800) 123-4567</p>

//     </div>
//     </div>
//     </>
//   )
//  }
// export default Contact

import React from 'react';

const Contact = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center mt-16 px-4 lg:px-0">
      
      {/* Image Section */}
      <div className="max-w-sm w-full mb-8 lg:mb-0 lg:mr-10">
        <img
          className="w-full h-auto rounded-lg shadow-md"
          src="https://i.pinimg.com/736x/24/ff/cf/24ffcfb1e082b236f6898007351d7f76.jpg"
          alt="Customer support illustration"
        />
      </div>

      {/* Info Box */}
      <div className="max-w-md w-full bg-[#f3f4f6] p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">
          Thank you for contacting us!
        </h1>
        <p className="text-gray-700 mb-4">
          A member of our support team will get back to you within 24–48 hours.
        </p>

        <div className="space-y-2 text-gray-600 text-sm">
          <p><strong>Instagram:</strong> @grandbasket</p>
          <p><strong>Facebook:</strong> facebook.com/grandbasket</p>
          <p><strong>WhatsApp:</strong> +1 (800) 123-4567</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
