import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import Link from 'next/link';

const Orders = () => {

  const [orders, setorders] = useState([])

  useEffect(() => {

    const fetchOrders = async() => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({token: localStorage.getItem('token')}),
      });
  
      const json = await response.json();
      setorders (json.orders)
    }

    if(!localStorage.getItem('token')){
      Router.push('/')
    }else{
    fetchOrders()
  }

    
  }, [])

  return (
    <div className='min-h-screen'>
    <h1 className="text-2xl font-semibold text-center p-8">My Orders</h1>
    <div className="container mx-auto mt-4">
      <div className="flex flex-col ">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #Order Id
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {orders.map((item)=>{
                    return <tr key={item._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.orderId}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.email}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.amount}
                    </td>
                    <td className="text-sm text-blue-700  px-6 py-4 whitespace-nowrap">
                      <Link href={'/order?id=' + item._id}><a> Details </a></Link>
                    </td>
                  </tr>
                  })}
     
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Orders;
