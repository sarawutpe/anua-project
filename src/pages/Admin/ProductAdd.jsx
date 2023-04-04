import { addProduct } from '@/services/api'
import AdminTheme from '@/theme/AdminTheme'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductAdd = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState({
    code: '',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    image: '',
  })
  const [fileImage, setFileImage] = useState(null)

  // บันทึกข้อมูล
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      // เซ็ตโหลดเป็นจริง
      setIsLoading(true)

      // Create a new FormData object
      const formData = new FormData()
      formData.append('code', product.code)
      formData.append('name', product.name)
      formData.append('description', product.description)
      formData.append('price', product.price.toString())
      formData.append('stock', product.stock.toString())

      // เช็คก่อนว่ามีรูปภาพหรือไม่ ถ้ามีค่อยบันทึกลงฟอร์ม
      if (fileImage) {
        formData.append('image', fileImage)
      }

      // เรียกฟังก์ชันเพิ่มสินค้า
      const result = await addProduct(formData)
      // เช็คว่าข้อมูลกลับมาถูกต้อง ถ้าถูกต้องให้เปลี่ยนหน้าไปหน้าหน้าแรก admin
      if (result.success) {
        navigate('/admin')
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      // สุดท้ายทำการปิดสถานะโหลด
      setIsLoading(false)
    }
  }

  return (
    <AdminTheme>
      {/* Head */}
      <div className='w-full top-0 py-1'>
        <div className='w-full container flex flex-wrap items-center justify-between mt-0'>
          <p className='uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl '>
            Add Product
          </p>
          <div className='flex items-center'>
            <button onClick={() => navigate('/admin')}>View Product</button>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className='mb-2'>
          <label className='flex mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Code
          </label>
          <input
            type='text'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder=''
            required
            onChange={(e) => {
              setProduct({ ...product, code: e.target.value })
            }}
          />
        </div>

        <div className='mb-2'>
          <label className='flex mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Name
          </label>
          <input
            type='text'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder=''
            required
            onChange={(e) => {
              setProduct({ ...product, name: e.target.value })
            }}
          />
        </div>

        <div className='mb-2'>
          <label className='flex mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Description
          </label>
          <input
            type='text'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder=''
            required
            onChange={(e) => {
              setProduct({ ...product, description: e.target.value })
            }}
          />
        </div>

        <div className='mb-2'>
          <label className='flex mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Price
          </label>
          <input
            type='number'
            step='0.01'
            min='0'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder=''
            required
            onChange={(e) => {
              setProduct({ ...product, price: Number(e.target.value) })
            }}
          />
        </div>

        <div className='mb-2'>
          <label className='flex mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Stock
          </label>
          <input
            type='number'
            min='0'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder=''
            required
            onChange={(e) => {
              setProduct({ ...product, stock: Number(e.target.value) })
            }}
          />
        </div>

        <div className='mb-2'>
          <label className='flex mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Image
          </label>
          <input
            type='file'
            accept='image/jpeg,image/png'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            onChange={(e) => {
              const file = e.target.files[0]
              setFileImage(file)
            }}
          />
        </div>

        <div className='flex my-4 gap-2'>
          <button type='button' className='inline-flex items-center' onClick={() => navigate('/admin')}>Cancel</button>
          <button type='submit' className='inline-flex items-center'>
            {isLoading && (
              <svg
                className='animate-spin -ml-1 mr-3 h-5 w-5'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
            )}
            {isLoading ? 'Processing...' : 'Add +'}
          </button>
        </div>
      </form>
    </AdminTheme>
  )
}

export default ProductAdd
