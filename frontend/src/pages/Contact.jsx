import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t'>
          <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our 1st Store</p>
          <p className=' text-gray-500'>Ramnagar <br /> Tarakeswar Hooghly Pin-712410</p>
          <p className=' text-gray-500'>Tel: 9883114813 <br /> Email: globalinfocomworld@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Our 2nd Store</p>
          <p className=' text-gray-500'>Gajarmore <br /> Jangipara Hooghly Pin-712410</p>
          <p className=' text-gray-500'>Tel: 9831764962 <br /> Email: globalinfocomworld@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Contact us</p>
          <p className=' text-gray-500'>At 8.00 am to 9.00 am.</p>
        </div>
      </div>
      <section className="w-full h-[500px] md:h-[700px] py-10 px-6 md:px-10">
        <iframe
          title="Shop Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.682242287363!2d88.0153558!3d22.8627665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f86fe284c84a4d%3A0xa441ef1f1568cf3d!2sGLOBAL%20INFOCOM%20WORLD!5e0!3m2!1sen!2sin!4v1726317900000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>


    </div>
  )
}

export default Contact
