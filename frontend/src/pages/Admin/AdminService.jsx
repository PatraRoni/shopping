import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import Sidebar from './Sidebar'

const AdminService = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [service, setService] = useState([])

    const fetchAllServices = async () => {

        try {
            const response = await axios.get(backendUrl + '/api/service/all', {
                
            })

            if (response.data.success) {
                setService(response.data.serviceData.reverse())
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchAllServices()
    }, [])

    // Optional: local status handler if your service items include `status`
    // const statusHandler = async (e, id) => {
    //   const newStatus = e.target.value
    //   // Optimistic UI update
    //   setService(prev => prev.map(s => (s._id === id ? { ...s, status: newStatus } : s)))
    //   // If you have a backend endpoint to update status, uncomment and adjust:
    //   // try {
    //   //   await axios.put(`${backendUrl}/api/service/${id}/status`, { status: newStatus }, { headers: { token } })
    //   // } catch (err) {
    //   //   toast.error('Failed to update status')
    //   // }
    // }

    return (
        <div className='flex w-full'>
      <Sidebar />
      <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
        <div>
            <h3>Service Page</h3>
            <div>
                {service.length > 0 ? (
                    service.map((item, index) => (
                        <div
                            key={item._id ?? index}
                            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
                        >
                            {/* icon */}
                            <div className="flex items-start">
                                <img className="w-12" src={assets.service_icon ?? assets.parcel_icon} alt="service" />
                            </div>

                            {/* details */}
                            <div>
                                <div>
                                    <p className="py-0.5 font-semibold">{item.ProductName}</p>
                                </div>

                                <p className="mt-3 mb-2 font-medium">
                                    {item.firstName} {item.lastName}
                                </p>

                                <div>
                                    <p>{item.street + ','}</p>
                                    <p>{item.city + ', ' + item.state + ', ' + item.country + ', ' + item.zipcode}</p>
                                </div>

                                <p className="mt-1">{item.email}</p>
                                <p>{item.phone}</p>
                            </div>

                            {/* metadata */}
                            <div>
                                <p className="text-sm sm:text-[15px]">Product : {item.ProductName}</p>
                                <p className="mt-3">Requested on : {new Date(item.date).toLocaleDateString()}</p>
                                <p className="mt-1">Contact email : {item.email}</p>
                            </div>

                            {/* optional extra columns (example placeholders to match Order layout) */}
                            <div className="hidden lg:block">
                                {/* If you had an amount or service fee, show here */}
                                <p className="text-sm sm:text-[15px]"></p>
                            </div>

                            {/* status or placeholder */}
                            {/* <div>
                {item.status ? (
                  <select
                    onChange={(e) => statusHandler(e, item._id)}
                    value={item.status}
                    className="p-2 font-semibold"
                  >
                    <option value="Requested">Requested</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                ) : (
                  <p className="p-2 font-semibold">Requested</p>
                )}
              </div> */}
                        </div>
                    ))
                ) : (
                    <p>No service records found</p>
                )}
            </div>
        </div>
        </div>
        </div>
    )
}

export default AdminService
