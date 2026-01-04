// import React from 'react'
// import {Outlet} from "react-router-dom"
// import Navbar from '../../components/educator/Navbar'
// import SideBar from '../../components/educator/SideBar'
// import Footer from '../../components/educator/Footer'

// const Educator = () => {
//   return (
//     <div className='text-base min-h-screen bg-white'>
//         <Navbar/>
//         <div className='flex'>
//           <SideBar/>
//           <div className='flex-1/2'>
//             {<Outlet/>}
//           </div>
//         </div>
//         <Footer/>
//     </div>
//   )
// }

// export default Educator

import React from 'react'
import { Outlet } from "react-router-dom"
import Navbar from '../../components/educator/Navbar'
import SideBar from '../../components/educator/SideBar'
import Footer from '../../components/educator/Footer'

const Educator = () => {
  return (
    <div className='text-base min-h-screen bg-white'>
      <Navbar />

      <div className='flex'>
        <SideBar />

        {/* Dashboard / nested route will show here */}
        <div className='flex-1 p-5'>
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Educator
