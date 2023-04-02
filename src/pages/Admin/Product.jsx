import { deleteProduct, getProducts } from '@/services/api'
import AdminTheme from '@/theme/AdminTheme'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Product = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true)
      const result = await getProducts()
      const data = result.data || []

      if (result.success) {
        setProducts(data)
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleDeleteProduct = async (id, code) => {
    try {
      const isConfirm = confirm(`คุณต้องการลบสินค้า ${code}?`)

      if (isConfirm) {
        const result = await deleteProduct(id)

        if (result.success) {
          fetchProducts()
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <AdminTheme>
      {/* Head */}
      <div className='w-full top-0 py-1 mb-3'>
        <div className='w-full container mx-auto flex flex-wrap items-center justify-between mt-0'>
          <p className='uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl '>
            {isLoading ? 'Loading...' : `Product ${products.length}`}
          </p>
          <div className=''>
            <button onClick={() => navigate('/admin/product-add')}>Add Product</button>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className='overflow-x-auto'>
        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
          <table className='min-w-full leading-normal'>
            <thead>
              <tr>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'></th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Image
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Code
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Name
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Description
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Price
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Stock
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={index} className='align-top'>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm w-[100px]'>
                    <div className='flex gap-4'>
                      <PencilSquareIcon
                        className='w-[24px] h-[24px] cursor-pointer'
                        onClick={() => {
                          navigate(`product-edit/${item.id}`)
                        }}
                      />
                      <TrashIcon
                        className='w-[24px] h-[24px] cursor-pointer'
                        onClick={() => {
                          handleDeleteProduct(item.id, item.code)
                        }}
                      />
                    </div>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <div className='flex justify-center'>
                      <div className='w-10 h-10'>
                        <img
                          className='w-full h-full rounded-full'
                          src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`}
                          alt=''
                        />
                      </div>
                    </div>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap text-center'>{item.code}</p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap text-center'>{item.name}</p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap text-center'>
                      {item.description}
                    </p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap text-center'>{item.price}</p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap text-center'>{item.stock}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminTheme>
  )
}

export default Product
