
import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import BrandCarousel from '../components/BrandCarousel'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  country: '',
  phone: '',
  ProductName: '',
}

const Service = () => {
  const { navigate, backendUrl, token, cartItems, setCartItems, products } = useContext(ShopContext);

  const [formData, setFormData] = useState(initialFormState)
  const [loading, setLoading] = useState(false)

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      let orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      // build order payload (add orderItems if you want to send them)
      let orderData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipcode: formData.zipcode,
        country: formData.country,
        phone: formData.phone,
        ProductName: formData.ProductName,
        // items: orderItems    // uncomment if your backend accepts items
      }

      const response = await axios.post(backendUrl + '/api/service/book', orderData, { headers: { token } })

      if (response.data.success) {
        // clear cart and reset form
        setCartItems({})
        setFormData(initialFormState)

        toast.success('Service booked successfully!')
        // optionally navigate('/orders') if you want to redirect
        // navigate('/orders')
      } else {
        toast.error(response.data.message || 'Could not place order')
      }

    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.message || error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <BrandCarousel />
      {/* ToastContainer can live here or in your App root (only one needed) */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />

      <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
        {/* ------------- Left Side ---------------- */}
        <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

          <div className='text-xl sm:text-2xl my-3'>
            <Title text1={'BOOK YOUR'} text2={'SERVICES'} />
          </div>

          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
            <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
          </div>

          <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
          <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />

          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
            <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
          </div>

          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
            <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
          </div>

          <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
          <input required onChange={onChangeHandler} name='ProductName' value={formData.ProductName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Product Name' />

          <div className='w-full text-end mt-8'>
            <button type='submit' disabled={loading} className={`bg-black text-white px-16 py-3 text-sm ${loading ? 'opacity-70' : ''}`}>
              {loading ? 'PLACING...' : 'PLACE ORDER'}
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Service
