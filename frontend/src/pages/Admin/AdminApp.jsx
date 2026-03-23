import React, { useState, useEffect, useContext } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'
import { ShopContext } from '../../context/ShopContext'

const AdminApp = () => {
    const { token, backendUrl, currency } = useContext(ShopContext) || {};
    const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, lowStock: 0 })
    const [lowStockList, setLowStockList] = useState([])
    const [recentOrders, setRecentOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!token) return;
        const fetchDashboardData = async () => {
            try {
                const url = backendUrl || import.meta.env.VITE_BACKEND_URL;
                // Fetch Products
                const resProducts = await axios.get(url + '/api/product/list')
                let prodCount = 0;
                if (resProducts.data.success) {
                    prodCount = resProducts.data.products.length;
                }

                // Fetch Orders
                const resOrders = await axios.post(url + '/api/order/list', {}, { headers: { token } })
                let ordCount = 0;
                let totRevenue = 0;
                let recent = [];
                if (resOrders.data.success) {
                    const orders = resOrders.data.orders;
                    ordCount = orders.length;
                    totRevenue = orders.reduce((acc, order) => {
                       return acc + order.amount;
                    }, 0);
                    // Get 5 most recent orders
                    recent = orders.sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
                }

                // Fetch Low Stock
                const resLowStock = await axios.get(url + '/api/product/low-stock', { headers: { token } })
                let lowStockData = [];
                if (resLowStock.data.success) {
                    lowStockData = resLowStock.data.products;
                }

                setStats({
                    products: prodCount,
                    orders: ordCount,
                    revenue: totRevenue,
                    lowStock: lowStockData.length
                })
                setLowStockList(lowStockData)
                setRecentOrders(recent)

            } catch(err) {
                console.error("Error fetching dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [token, backendUrl])

    return (
        <div className='flex w-full bg-gray-50 min-h-screen font-sans'>
            <Sidebar />
            <div className='w-[80%] mx-auto px-8 py-10 text-gray-800 text-base overflow-y-auto'>
                
                <div className='mb-10 flex items-center justify-between'>
                    <div>
                        <h1 className='text-4xl font-black text-gray-900 tracking-tight'>Admin Dashboard</h1>
                        <p className='text-gray-500 mt-2 font-medium'>Here's your store's performance at a glance.</p>
                    </div>
                    {/* Optional: Add a date or quick action button here */}
                </div>

                {loading ? (
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-pulse'>
                        {[1,2,3,4].map(i => <div key={i} className='bg-white h-32 rounded-2xl shadow-sm border border-gray-100'></div>)}
                    </div>
                ) : (
                    <>
                        {/* Metrics Cards */}
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12'>
                            
                            <div className='group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
                                <div className='flex items-center justify-between'>
                                    <h3 className='text-gray-500 font-semibold uppercase tracking-wider text-xs'>Total Products</h3>
                                    <div className='p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300'>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                                    </div>
                                </div>
                                <p className='text-4xl font-extrabold mt-4 text-gray-900'>{stats.products}</p>
                            </div>
                            
                            <div className='group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
                                <div className='flex items-center justify-between'>
                                    <h3 className='text-gray-500 font-semibold uppercase tracking-wider text-xs'>Total Orders</h3>
                                    <div className='p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300'>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                    </div>
                                </div>
                                <p className='text-4xl font-extrabold mt-4 text-gray-900'>{stats.orders}</p>
                            </div>

                            <div className='group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300'>
                                <div className='flex items-center justify-between'>
                                    <h3 className='text-gray-500 font-semibold uppercase tracking-wider text-xs'>Total Revenue</h3>
                                    <div className='p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300'>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                </div>
                                <p className='text-4xl font-extrabold mt-4 text-gray-900'>{currency || '₹'}{stats.revenue.toLocaleString()}</p>
                            </div>

                            <div className='group bg-gradient-to-br from-red-50 to-white p-6 rounded-2xl shadow-sm border border-red-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden'>
                                <div className='absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-400 to-red-600'></div>
                                <div className='flex items-center justify-between'>
                                    <h3 className='text-red-500 font-semibold uppercase tracking-wider text-xs'>Low Stock Alerts</h3>
                                    <div className='p-3 bg-red-100 text-red-600 rounded-xl animate-pulse'>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                    </div>
                                </div>
                                <p className='text-4xl font-extrabold mt-4 text-gray-900'>{stats.lowStock}</p>
                            </div>
                        </div>

                        {/* Tables Section */}
                        <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
                            
                            {/* Low Stock Table */}
                            <div className='bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col'>
                                <div className='px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white'>
                                    <h2 className='text-lg font-bold text-gray-900 flex items-center gap-2'>
                                        <div className='w-2 h-2 rounded-full bg-red-500'></div>
                                        Needs Attention Data
                                    </h2>
                                </div>
                                
                                {lowStockList.length === 0 ? (
                                    <div className='p-10 text-center flex-1 flex flex-col justify-center items-center'>
                                        <div className='w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4'>
                                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <span className='font-semibold text-gray-800 text-lg'>All Clear!</span>
                                        <p className='text-gray-500 mt-1'>Stock levels are completely healthy.</p>
                                    </div>
                                ) : (
                                    <div className='w-full overflow-y-auto max-h-[400px]'>
                                        <table className='w-full text-left'>
                                            <thead className='sticky top-0 bg-white shadow-sm z-10'>
                                                <tr className='text-gray-400 text-xs uppercase tracking-wider font-semibold border-b border-gray-100'>
                                                    <th className='p-4 pl-6'>Product</th>
                                                    <th className='p-4'>Category</th>
                                                    <th className='p-4 text-center'>Stock</th>
                                                </tr>
                                            </thead>
                                            <tbody className='divide-y divide-gray-50'>
                                                {lowStockList.map((product) => (
                                                    <tr key={product._id} className='hover:bg-gray-50/50 transition-colors'>
                                                        <td className='p-4 pl-6 flex items-center gap-4'>
                                                            <div className='w-12 h-12 rounded-xl border border-gray-100 overflow-hidden flex-shrink-0'>
                                                                <img src={product.image[0]} alt={product.name} className='w-full h-full object-cover' />
                                                            </div>
                                                            <span className='font-bold text-gray-800 line-clamp-2'>{product.name}</span>
                                                        </td>
                                                        <td className='p-4 text-gray-500 font-medium text-sm'>{product.category}</td>
                                                        <td className='p-4 text-center'>
                                                            <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold ${product.stock === 0 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>
                                                                {product.stock} Left
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            {/* Recent Orders Table */}
                            <div className='bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col'>
                                <div className='px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white'>
                                    <h2 className='text-lg font-bold text-gray-900 flex items-center gap-2'>
                                        <div className='w-2 h-2 rounded-full bg-blue-500'></div>
                                        Recent Orders
                                    </h2>
                                </div>
                                {recentOrders.length === 0 ? (
                                    <div className='p-10 text-center flex-1 flex flex-col justify-center items-center'>
                                        <p className='text-gray-500'>No recent orders to show.</p>
                                    </div>
                                ) : (
                                    <div className='w-full overflow-y-auto max-h-[400px]'>
                                        <table className='w-full text-left'>
                                            <thead className='sticky top-0 bg-white shadow-sm z-10'>
                                                <tr className='text-gray-400 text-xs uppercase tracking-wider font-semibold border-b border-gray-100'>
                                                    <th className='p-4 pl-6'>Order ID</th>
                                                    <th className='p-4'>Amount</th>
                                                    <th className='p-4'>Status</th>
                                                    <th className='p-4'>Payment</th>
                                                </tr>
                                            </thead>
                                            <tbody className='divide-y divide-gray-50'>
                                                {recentOrders.map((order, idx) => (
                                                    <tr key={idx} className='hover:bg-gray-50/50 transition-colors'>
                                                        <td className='p-4 pl-6 text-sm font-semibold text-gray-800'>
                                                            #{order._id.slice(-6).toUpperCase()}
                                                        </td>
                                                        <td className='p-4 text-gray-600 font-medium'>
                                                            {currency || '₹'}{order.amount}
                                                        </td>
                                                        <td className='p-4'>
                                                            <span className='px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-semibold'>
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                        <td className='p-4'>
                                                            <span className={`px-2 py-1 rounded-md text-xs font-semibold ${order.payment ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                                                                {order.payment ? 'Paid' : 'Unpaid'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default AdminApp