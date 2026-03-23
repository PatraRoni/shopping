import React from 'react'
import { assets } from '../assets/assets'
import PhotoTransition from './PhotoTransition'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className=' font-medium text-sm md:text-base'>Welcome to</p>
                </div>
                <h1 className=' prata-regular text-3xl sm:py-3 lg:text-4xl leading-relaxed'>GLOBAL INFOCOM WORLD</h1>
                {/* <h1 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold leading-tight mb-3">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                GLOBAL INFOCOM WORLD
              </span>
            </h1> */}
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm md:text-base'>SHOP NOW AND ENJOY OUR SERVISES</p>
                    <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                </div>
            </div>
      </div>
      {/* Hero Right Side */}
      <PhotoTransition/>
    </div>
  )
}

export default Hero
