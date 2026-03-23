// import React, { useState } from 'react'
// import { assets } from '../../assets/assets'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import Sidebar from './Sidebar'

// const Add = () => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL

//   const [image1, setImage1] = useState(false)
//   const [image2, setImage2] = useState(false)
//   const [image3, setImage3] = useState(false)
//   const [image4, setImage4] = useState(false)

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("Men");
//   const [subCategory, setSubCategory] = useState("Topwear");
//   const [bestseller, setBestseller] = useState(false);
//   const [sizes, setSizes] = useState([]);

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {

//       const formData = new FormData()

//       formData.append("name", name)
//       formData.append("description", description)
//       formData.append("price", price)
//       formData.append("category", category)
//       formData.append("subCategory", subCategory)
//       formData.append("bestseller", bestseller)
//       formData.append("sizes", JSON.stringify(sizes))

//       image1 && formData.append("image1", image1)
//       image2 && formData.append("image2", image2)
//       image3 && formData.append("image3", image3)
//       image4 && formData.append("image4", image4)

//       const response = await axios.post(backendUrl + "/api/product/add", formData)

//       if (response.data.success) {
//         toast.success(response.data.message)
//         setName('')
//         setDescription('')
//         setImage1(false)
//         setImage2(false)
//         setImage3(false)
//         setImage4(false)
//         setPrice('')
//       } else {
//         toast.error(response.data.message)
//       }

//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
//     }
//   }

//   return (
//     <div className='flex w-full'>
//       <Sidebar />
//       <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
//         <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
//           <div>
//             <p className='mb-2'>Upload Image</p>

//             <div className='flex gap-2'>
//               <label htmlFor="image1">
//                 <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
//                 <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
//               </label>

//             </div>
//           </div>

//           <div className='w-full'>
//             <p className='mb-2'>Product name</p>
//             <input onChange={(e) => setName(e.target.value)} value={name} className='border border-gray-600 w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
//           </div>

//           <div className='w-full'>
//             <p className='mb-2'>Product description</p>
//             <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='border border-gray-600 w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
//           </div>

//           <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

//             <div>
//               <p className='mb-2'>Product Price</p>
//               <input onChange={(e) => setPrice(e.target.value)} value={price} className='border border-gray-600 w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
//             </div>

//           </div>



//           <div className='flex gap-2 mt-2'>
//             <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
//             <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
//           </div>

//           <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>

//         </form>
//       </div>
//     </div>
//   )
// }

// export default Add

import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import Sidebar from './Sidebar'

const Add = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [stock, setStock] = useState("")

  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (loading) return

    // basic validation (optional)
    if (!name.trim() || !description.trim()) {
      toast.error("Please fill required fields")
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price) // backend should parse to number if needed
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      // send boolean as string if backend expects string, or leave as boolean
      formData.append("bestseller", String(bestseller))
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("stock", stock)

      if (image1) formData.append("image1", image1)
      if (image2) formData.append("image2", image2)
      if (image3) formData.append("image3", image3)
      if (image4) formData.append("image4", image4)

      // NOTE: Let the browser set Content-Type with boundary for FormData.
      // Adding 'Content-Type': 'multipart/form-data' manually can break the boundary.
      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        // optional: withCredentials: true,
        timeout: 30000 // optional: fail if backend doesn't respond in 30s
      })

      // Defensive checks: ensure we actually got a JSON response and check HTTP status
      if (response?.status === 200 && response.data && response.data.success === true) {
        toast.success(response.data.message || "Product added")
        // reset only on success
        setName("")
        setDescription("")
        setImage1(null)
        setImage2(null)
        setImage3(null)
        setImage4(null)
        setPrice("")
        setStock("")
        setBestseller(false)
        setSizes([])
      } else {
        // If backend returns 200 but success false — show backend message if present
        const msg = response?.data?.message || `Unexpected response (${response?.status})`
        toast.error(msg)
      }
    } catch (error) {
      // Prefer backend error message when available
      const backendMsg = error?.response?.data?.message
      const status = error?.response?.status
      console.error("Add product error:", error)
      if (backendMsg) {
        toast.error(backendMsg)
      } else if (status) {
        toast.error(`Request failed (${status})`)
      } else {
        toast.error(error.message || "Network error")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex w-full'>
      <Sidebar />
      <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
          <div>
            <p className='mb-2'>Upload Image</p>

            <div className='flex gap-2'>
              <label htmlFor="image1" className="cursor-pointer">
                <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
              </label>

              {/* you can add similar labels for image2..image4 if needed */}
            </div>
          </div>

          <div className='w-full'>
            <p className='mb-2'>Product name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='border border-gray-600 w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
          </div>

          <div className='w-full'>
            <p className='mb-2'>Product description</p>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='border border-gray-600 w-full max-w-[500px] px-3 py-2' placeholder='Write content here' required />
          </div>

          <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            <div>
              <p className='mb-2'>Product Price</p>
              <input onChange={(e) => setPrice(e.target.value)} value={price} className='border border-gray-600 w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='25' />
            </div>
            <div>
              <p className='mb-2'>Product Stock</p>
              <input onChange={(e) => setStock(e.target.value)} value={stock} className='border border-gray-600 w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='100' required />
            </div>
          </div>

          <div className='flex gap-2 mt-2'>
            <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
            <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
          </div>

          <button
            type="submit"
            className={`w-28 py-3 mt-4 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black'} text-white`}
            disabled={loading}
          >
            {loading ? 'ADDING...' : 'ADD'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Add
