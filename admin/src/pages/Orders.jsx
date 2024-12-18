// import { useEffect, useState } from "react";
// import axios from 'axios'
// import { backendUrl, currency } from '../App'
// import { toast } from 'react-toastify'
// import { assets } from "../assets/assets";

// const Orders = ({ token }) => {

//   const [orders, setOrders] = useState([]);

//   // const fetchAllOrders = async () => {

//   //   if (!token) {
//   //     return null;

//   //   }

//   //   try {

//   //     const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
//   //     if (response.data.success) {
//   //       setOrders(response.data.orders)
//   //     } else {
//   //       toast.error(response.data.message)
//   //     }


//   //   } catch (error) {
//   //     toast.error(error.message)
//   //   }

//   // }

//   const fetchAllOrders = async () => {
//     if (!token) {
//       return null;
//     }

//     try {
//       const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
//       if (response.data.success) {
//         setOrders(response.data.orders);
//         console.log(response.data.orders);

//       } else {
//         toast.error(response.data.message);
//       }

//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const statusHandler = async (event, orderId) => {
//     try {

//       const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } })
//       if (response.data.success) {
//         await fetchAllOrders()
//       }

//     } catch (error) {
//       console.log(error);
//       toast.error(error.data.message)
//     }
//   }

//   useEffect(() => {
//     fetchAllOrders();
//   }, [token]);

//   return (
//     <div>
//       <h3>Order Page</h3>
//       <div>
//         {
//           orders.map((order, index) => (
//             <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 " key={index}>
//               <img className="w-12" src={assets.parcel_icon} />
//               <div>
//                 <div>
//                   {order.items.map((item, index) => {
//                     if (index === order.items.length - 1) {
//                       return <p className="py-0.5" key={index}>{item.name} x {item.quantity} <span> {item.size}</span></p>
//                     }
//                     else {
//                       return <p className="py-0.5" key={index}>{item.name} x {item.quantity} <span> {item.size},</span></p>
//                     }
//                   })}
//                 </div>
//                 <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
//                 <div>
//                   <p>{order.address.street + ", "}</p>
//                   <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>

//                 </div>
//                 <p>{order.address.phone}</p>
//               </div>
//               <div>
//                 <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
//                 <p className="mt-3">Method : {order.paymentMethod} </p>
//                 <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
//                 <p>Date : {new Date(order.date).toLocaleDateString()}</p>
//               </div>
//               <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>
//               <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className="p-2 font-semibold" >
//                 <option value="Order Place">Order Place</option>
//                 <option value="Packing">Packing</option>
//                 <option value="Shipped">Shipped</option>
//                 <option value="Out for delivery">Out for delivery</option>
//                 <option value="Delivered">Delivered</option>
//               </select>
//             </div>
//           ))

//         }
//       </div>
//     </div>
//   );


//   // return (
//   //   <div>
//   //     <h3>Order Page</h3>
//   //     <div>
//   //       {orders && orders.length > 0 ? (
//   //         orders.map((order, index) => (
//   //           <div
//   //             className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
//   //             key={index}
//   //           >
//   //             <img className="w-12" src={assets.parcel_icon} />
//   //             <div>
//   //               <div>
//   //                 {order.items && order.items.length > 0 ? (
//   //                   order.items.map((item, index) => (
//   //                     <p
//   //                       className="py-0.5"
//   //                       key={index}
//   //                     >
//   //                       {item.name} x {item.quantity}{" "}
//   //                       <span> {item.size}</span>
//   //                     </p>
//   //                   ))
//   //                 ) : (
//   //                   <p>No items</p>
//   //                 )}
//   //               </div>
//   //               <p className="mt-3 mb-2 font-medium">
//   //                 {order.address.firstName + " " + order.address.lastName}
//   //               </p>
//   //               <div>
//   //                 <p>{order.address.street + ", "}</p>
//   //                 <p>
//   //                   {order.address.city +
//   //                     ", " +
//   //                     order.address.state +
//   //                     ", " +
//   //                     order.address.country +
//   //                     ", " +
//   //                     order.address.zipcode}
//   //                 </p>
//   //               </div>
//   //               <p>{order.address.phone}</p>
//   //             </div>
//   //             <div>
//   //               <p className="text-sm sm:text-[15px]">
//   //                 Items : {order.items.length}
//   //               </p>
//   //               <p className="mt-3">Method : {order.paymentMethod} </p>
//   //               <p>Payment: {order.payment ? "Done" : "Pending"}</p>
//   //               <p>
//   //                 Date : {new Date(order.date).toLocaleDateString()}
//   //               </p>
//   //             </div>
//   //             <p className="text-sm sm:text-[15px]">
//   //               {currency}
//   //               {order.amount}
//   //             </p>
//   //             <select
//   //               onChange={(event) => statusHandler(event, order._id)}
//   //               value={order.status}
//   //               className="p-2 font-semibold"
//   //             >
//   //               <option value="Order Place">Order Place</option>
//   //               <option value="Packing">Packing</option>
//   //               <option value="Shipped">Shipped</option>
//   //               <option value="Out for delivery">
//   //                 Out for delivery
//   //               </option>
//   //               <option value="Delivered">Delivered</option>
//   //             </select>
//   //           </div>
//   //         ))
//   //       ) : (
//   //         <p>No orders found.</p>
//   //       )}
//   //     </div>
//   //   </div>
//   // );

// };


// export default Orders;

import React, { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const ordersPerPage = 10;

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, {
        headers: { token },
        timeout: 10000
      });

      if (response.data.success) {
        setOrders(response.data.orders);
        console.log(response.data.orders);
      } else {
        toast.error(response.data.message);
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data?.message || "An error occurred while updating status");
    }
  };

  // Filter and search orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order =>
      order.address.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.phone.includes(searchTerm) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, orders]);

  // Sort and paginate orders
  const sortedAndPaginatedOrders = useMemo(() => {
    // Sorting
    let sortableOrders = [...filteredOrders];
    sortableOrders.sort((a, b) => {
      if (sortConfig.key === 'date') {
        return sortConfig.direction === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'asc'
          ? a.amount - b.amount
          : b.amount - a.amount;
      }
      return 0;
    });

    // Pagination
    const startIndex = (currentPage - 1) * ordersPerPage;
    return sortableOrders.slice(startIndex, startIndex + ordersPerPage);
  }, [filteredOrders, sortConfig, currentPage]);

  // Fetch orders effect
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="container mx-auto p-4">
      {/* Search and sort bar */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <input
          type="text"
          placeholder="Search orders (name, phone, status)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded mr-2"
        />
        <div className="flex space-x-2">
          <select
            onChange={(e) => setSortConfig(prev => ({
              ...prev,
              key: e.target.value
            }))}
            className="p-2 border rounded"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
          <button
            onClick={() => setSortConfig(prev => ({
              ...prev,
              direction: prev.direction === 'asc' ? 'desc' : 'asc'
            }))}
            className="p-2 border rounded"
          >
            {sortConfig.direction === 'asc' ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {/* Status notifications */}
      {isLoading && (
        <div className="text-center py-4">
          <p>Loading orders...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Order list */}
      {!isLoading && !error && (
        <div>
          {sortedAndPaginatedOrders.length > 0 ? (
            sortedAndPaginatedOrders.map((order, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
              >
                <img className="w-12" src={assets.parcel_icon} alt="Parcel Icon" />
                <div>
                  <div>
                    {order.items.map((item, itemIndex) => (
                      <p key={itemIndex} className="py-0.5">
                        {item.name} x {item.quantity} <span>{item.size}</span>
                        {itemIndex < order.items.length - 1 ? ', ' : ''}
                      </p>
                    ))}
                  </div>
                  <p className="mt-3 mb-2 font-medium">
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <div>
                    <p>{order.address.street + ", "}</p>
                    <p>
                      {order.address.city + ", " +
                        order.address.state + ", " +
                        order.address.country + ", " +
                        order.address.zipcode}
                    </p>
                  </div>
                  <p>{order.address.phone}</p>
                </div>
                <div>
                  <p className="text-sm sm:text-[15px]">Number of items: {order.items.length}</p>
                  <p className="mt-3">Payment Method: {order.paymentMethod}</p>
                  <p>Payment: {order.payment ? 'Completed' : 'Pending'}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className="p-2 font-semibold"
                >
                  <option value="Order Place">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              No orders found
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !error && filteredOrders.length > ordersPerPage && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({
            length: Math.ceil(filteredOrders.length / ordersPerPage)
          }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
