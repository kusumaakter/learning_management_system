// import React from 'react'
// import { assets } from '../../assets/assets'

// const Footer = () => {
//   return (
//     <footer className='flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-8 py-4 border-t border-gray-200 bg-white'>
//       {/* Left section - Logo and Copyright */}
//       <div className='flex items-center gap-4 mb-4 md:mb-0'>
//         <img src={assets.logo} alt="logo" className='w-16 md:w-20' />
//         <div className='hidden md:block h-6 w-px bg-gray-300'></div>
//         <p className='text-xs md:text-sm text-gray-500 text-center md:text-left'>
//           Copyright 2025 JKKNIU. All Rights Reserved.
//         </p>
//       </div>

//       {/* Right section - Social Media Icons */}
//       <div className='flex items-center gap-3'>
//         <a
//           href="#"
//           className='hover:opacity-70 transition-opacity duration-200'
//           aria-label="Facebook"
//         >
//           <img src={assets.facebook_icon} alt="facebook-icon" className='w-6 h-6' />
//         </a>
//         <a
//           href="#"
//           className='hover:opacity-70 transition-opacity duration-200'
//           aria-label="Twitter"
//         >
//           <img src={assets.twitter_icon} alt="twitter_icon" className='w-6 h-6' />
//         </a>
//         <a
//           href="#"
//           className='hover:opacity-70 transition-opacity duration-200'
//           aria-label="Instagram"
//         >
//           <img src={assets.instagram_icon} alt="instagram_icon" className='w-6 h-6' />
//         </a>
//       </div>
//     </footer>
//   )
// }

// export default Footer
import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 py-6 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <img
            src={assets.logo}
            alt="logo"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border border-gray-300 shadow-sm hover:scale-105 transition-transform duration-200"
          />

          <div className="hidden md:block h-8 w-px bg-gray-300"></div>

          <p className="text-sm text-gray-600 font-light text-center md:text-left">
            © 2025 JKKNIU — All Rights Reserved.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:scale-110 transition-transform"
          >
            <img
              src={assets.facebook_icon}
              alt="facebook-icon"
              className="w-6 h-6 opacity-80 hover:opacity-100"
            />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:scale-110 transition-transform"
          >
            <img
              src={assets.twitter_icon}
              alt="twitter-icon"
              className="w-6 h-6 opacity-80 hover:opacity-100"
            />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:scale-110 transition-transform"
          >
            <img
              src={assets.instagram_icon}
              alt="instagram-icon"
              className="w-6 h-6 opacity-80 hover:opacity-100"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
