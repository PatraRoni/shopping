import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { toast } from 'react-toastify'
import Sidebar from './Sidebar'
import { ShopContext } from '../../context/ShopContext'

const List = () => {

    const { token, backendUrl } = useContext(ShopContext)
    const currency = '₹'
    const [list, setList] = useState([])
    const [editData, setEditData] = useState(null)
    const [deleteData, setDeleteData] = useState(null)

    const fetchList = async () => {
        try {

            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setList(response.data.products.reverse());
            }
            else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const removeProduct = async (id) => {
        try {

            const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
                setDeleteData(null)
                await fetchList();
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const handleUpdate = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/product/update', {
                id: editData._id,
                price: Number(editData.price),
                stock: Number(editData.stock)
            }, { headers: { token } })
            
            if (response.data.success) {
                toast.success(response.data.message)
                setEditData(null)
                await fetchList()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <>
        <div className='flex w-full'>
      <Sidebar />
      <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
            <p className='mb-2'>All Products List</p>
            <div className='flex flex-col gap-2'>

                {/* ------- List Table Title ---------- */}

                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Price</b>
                    <b>Stock</b>
                    <b className='text-center'>Action</b>
                </div>

                {/* ------ Product List ------ */}

                {
                    list.map((item, index) => (
                        <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
                            <img className='w-12' src={item.image[0]} alt="" />
                            <p>{item.name}</p>
                            <p>{currency}{item.price}</p>
                            <p>{item.stock}</p>
                            <div className='flex justify-center gap-2'>
                                <button onClick={() => setEditData(item)} className='p-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors tooltip' title="Edit">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                </button>
                                <button onClick={() => setDeleteData(item)} className='p-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors tooltip' title="Delete">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>
                        </div>
                    ))
                }

            </div>
            </div>
            </div>

            {/* Edit Modal Overlay */}
            {editData && (
                <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
                        <h2 className="text-xl font-bold mb-1 text-gray-800">Edit Details</h2>
                        <p className="text-gray-500 mb-6 text-sm line-clamp-2">{editData.name}</p>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Price ({currency})</label>
                                <input 
                                    type="number" 
                                    value={editData.price} 
                                    onChange={(e) => setEditData({...editData, price: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity</label>
                                <input 
                                    type="number" 
                                    value={editData.stock} 
                                    onChange={(e) => setEditData({...editData, stock: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none rounded-lg"
                                />
                            </div>
                        </div>
            
                        <div className="mt-8 flex justify-end gap-3">
                            <button onClick={() => setEditData(null)} className="px-5 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-semibold">Cancel</button>
                            <button onClick={handleUpdate} className="px-5 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors font-semibold">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteData && (
                <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl text-center transform transition-all">
                        <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-100 mb-5">
                            <svg className="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold mb-2 text-gray-900">Delete Product</h2>
                        <p className="text-gray-500 mb-6 text-sm">Are you sure you want to delete <span className="font-bold text-gray-800 line-clamp-2 mt-2">{deleteData.name}</span>? This action cannot be undone.</p>
                        
                        <div className="flex justify-center gap-3">
                            <button onClick={() => setDeleteData(null)} className="px-5 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-semibold w-1/2">Cancel</button>
                            <button onClick={() => removeProduct(deleteData._id)} className="px-5 py-2.5 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors font-semibold w-1/2 shadow-sm shadow-red-200">Yes, delete it</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default List