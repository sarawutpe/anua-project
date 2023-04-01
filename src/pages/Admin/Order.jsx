import { getOrders } from '@/services/api'
import AdminTheme from '@/theme/AdminTheme'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Order = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  const convertOrders = (order) => {
    try {
      return JSON.parse(order) || []
    } catch (error) {
      console.log(error.message)
      return []
    }
  }

  const getSubTotal = (order) => {
    order = JSON.parse(order) || []
    if (order.length === 0) return

    let sum = 0
    sum = order.reduce((prev, curr) => {
      const productSubtotal = parseFloat(curr.price) * curr.quantity;
      return prev + productSubtotal;
    }, 0);

    return sum.toFixed(2);
  };


  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true)
      const result = await getOrders()
      const data = result.data || []

      if (result.success) {
        setOrders(data)
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return (
    <AdminTheme>
      {/* Head */}
      <div className='w-full top-0 py-1 mb-3'>
        <div className='w-full container mx-auto flex flex-wrap items-center justify-between mt-0'>
          <p className='uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl '>
            {isLoading ? 'Loading...' : `Orders ${orders.length}`}
          </p>
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
                  Customer Name
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Customer Email
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Customer Details
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Order Details
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className='align-top'>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm w-[50px]'>
                    {order.customerName}
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap text-center'>{order.customerName || ''}</p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap text-center'>{order.customerEmail || ''}</p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap text-center'>
                      {order.customerDetails || ''}
                    </p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm w-[400px] min-w-[400px]'>
                    {convertOrders(order.orderDetails).map((orderDetail, index) => (
                      <div key={index}>
                        <div className="grid grid-cols-4 items-center gap-2 mb-4 hover:grow hover:shadow-lg">
                          <p>Code {orderDetail.code || ''}</p>
                          <div className='w-10 h-10'>
                            <img
                              className='w-full h-full rounded-full'
                              src={`${import.meta.env.VITE_API_URL}/uploads/${orderDetail.image || ''}`}
                              alt=''
                            />
                          </div>
                          <p>฿{orderDetail.price || ''}</p>
                          <p>x{orderDetail.quantity || ''}</p>
                        </div>
                        {index === convertOrders(order.orderDetails).length - 1 && (
                          <p>SUBTOTAL ฿{getSubTotal(order.orderDetails)}</p>
                        )}
                      </div>
                    ))}
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

export default Order
