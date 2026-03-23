import React, { useEffect, useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../../context/ShopContext'

const Sidebar = () => {
    const { token, backendUrl } = useContext(ShopContext) || {};
    const [notifiedItems, setNotifiedItems] = useState(new Set());

    useEffect(() => {
        // Only run polling if user has a token (i.e. is logged in)
        if (!token) return;

        const checkLowStock = async () => {
            try {
                const response = await axios.get((backendUrl || import.meta.env.VITE_BACKEND_URL) + '/api/product/low-stock', { headers: { token } });
                if (response.data.success) {
                    const lowStockProducts = response.data.products;
                    
                    // Recover notified items from sessionStorage to avoid spamming on React Router navigations!
                    const sessionNotified = JSON.parse(sessionStorage.getItem('notifiedLowStock') || '[]');
                    let newNotified = new Set(sessionNotified);
                    let changed = false;

                    lowStockProducts.forEach(product => {
                        if (!newNotified.has(product._id)) {
                            if (product.stock === 0) {
                                toast.error(`Product "${product.name}" is OUT OF STOCK!`);
                            } else {
                                toast.warn(`Product "${product.name}" is low on stock (${product.stock} left)`);
                            }
                            newNotified.add(product._id);
                            changed = true;
                        }
                    });

                    if (changed) {
                        sessionStorage.setItem('notifiedLowStock', JSON.stringify([...newNotified]));
                    }
                }
            } catch (error) {
                console.error("Error fetching low stock:", error);
            }
        };

        // Initial check
        checkLowStock();

        // 60-second polling
        const interval = setInterval(checkLowStock, 60000);
        return () => clearInterval(interval);
    }, [token, backendUrl]);

  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

                <NavLink className={({isActive}) => `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition-colors ${isActive ? 'bg-gray-100 font-bold border-l-4 border-l-indigo-600 text-indigo-700' : 'hover:bg-gray-50 text-gray-600'}`} to="/admin/dasbord">
                    <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'><path d='M3 4a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h2v1H5zM3 13a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h2v1H5zM11 4a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zm2 2V5h2v1h-2zM11 13a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3zm2 2v-1h2v1h-2z'/></svg>
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition-colors ${isActive ? 'bg-gray-100 font-bold border-l-4 border-l-indigo-600 text-indigo-700' : 'hover:bg-gray-50 text-gray-600'}`} to="/admin/add">
                    <img className='w-5 h-5' src={assets.add_icon} alt="" />
                    <p className='hidden md:block'>Add Items</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition-colors ${isActive ? 'bg-gray-100 font-bold border-l-4 border-l-indigo-600 text-indigo-700' : 'hover:bg-gray-50 text-gray-600'}`} to="/admin/list">
                    <img className='w-5 h-5' src={assets.order_icon} alt="" />
                    <p className='hidden md:block'>List Items</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition-colors ${isActive ? 'bg-gray-100 font-bold border-l-4 border-l-indigo-600 text-indigo-700' : 'hover:bg-gray-50 text-gray-600'}`} to="/admin/orders">
                    <img className='w-5 h-5' src={assets.order_sidebar} alt="" />
                    <p className='hidden md:block'>Orders</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition-colors ${isActive ? 'bg-gray-100 font-bold border-l-4 border-l-indigo-600 text-indigo-700' : 'hover:bg-gray-50 text-gray-600'}`} to="/admin/service">
                    <img className='w-5 h-5' src={assets.service_icon} alt="" />
                    <p className='hidden md:block'>Service</p>
                </NavLink>

        </div>

    </div>
  )
}

export default Sidebar