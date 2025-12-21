import React from 'react'
import { useCart } from '../Context/Context'
export default function Profile() {
    const {user,email}=useCart();
  return (
   <div>
      <div className="hero  mt-30">
        <div className="hero-content flex-col lg:flex-row lg:justify-center lg:items-center gap-8 px-4 w-full h-full">
          {/* Text Section */}
          <div className="text-center lg:text-left w-full lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-5xl font-bold mb-6">Welcome! {user}</h1>
            <p className=" bg-base-200 w-full px-4 py-6  rounded ">
              Name:{user} <br />
              Email:{email}
            </p>
          </div>

        
        </div>
      </div>
    </div>
  )
}
