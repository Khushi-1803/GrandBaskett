

import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets, dummyOrders } from '../../assets/assets'
import toast from 'react-hot-toast'

const Orders = () => {
  const { currency, axios } = useAppContext()
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
   try {
    const {data}  = await axios.get('/api/order/seller')
    if (data.success) {
       setOrders(data.orders)
    }else{
      toast.error(data.message)
    }
   } catch (error) {
    toast.error(error.message)
   }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <div className="md:p-10 p-4 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Orders List</h2>

        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 max-w-5xl rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
          >
            {/* Product details */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center w-full md:w-1/3">
              <img
                className="w-14 h-14 object-cover border rounded-md bg-gray-50"
                src={assets.box_icon}
                alt="boxIcon"
              />
              <div className="flex flex-col space-y-1">
                {orders.items?.map((item, i) => (
                  <p key={i} className="font-medium text-gray-800">
                    {item.product.name}{' '}
                    <span className="text-sm text-gray-500">× {item.quantity}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="text-sm text-gray-600 w-full md:w-1/3">
              <p className="font-medium text-gray-800">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>{order.address.street}, {order.address.city}</p>
              <p>{order.address.state} {order.address.zipcode}, {order.address.country}</p>
              <p className="mt-1 text-gray-500">{order.address.phone}</p>
            </div>

            {/* Amount */}
            <p className="font-semibold text-lg text-gray-800 my-auto">
              {currency}{order.amount}
            </p>

            {/* Payment & Meta */}
            <div className="flex flex-col text-sm text-gray-600 w-full md:w-1/4">
              <p><span className="font-medium">Method:</span> {order.paymentType}</p>
              <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>
                <span className="font-medium">Payment:</span>{' '}
                <span className={order.isPaid ? 'text-green-600 font-medium' : 'text-red-500'}>
                  {order.isPaid ? 'Paid' : 'Pending'}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
