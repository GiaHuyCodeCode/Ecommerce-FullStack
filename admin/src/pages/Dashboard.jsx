

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { backendUrl, currency } from "../App";
// import { toast } from "react-toastify";
// import { Bar, Pie } from "react-chartjs-2";
// import "chart.js/auto";
// import { Calendar, Filter, Search, ChevronLeft, ChevronRight } from "lucide-react";

// const Dashboard = ({ token }) => {
//     const [orders, setOrders] = useState([]);
//     const [filteredOrders, setFilteredOrders] = useState([]);
//     const [stats, setStats] = useState({
//         totalOrders: 0,
//         totalRevenue: 0,
//         paidOrders: 0,
//         unpaidOrders: 0,
//         orderStatusCount: {},
//         paymentMethods: {},
//     });

//     const [dateRange, setDateRange] = useState({
//         startDate: new Date(new Date().getFullYear(), 0, 1),
//         endDate: new Date(),
//     });
//     const [statusFilter, setStatusFilter] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const ordersPerPage = 5;

//     useEffect(() => {
//         fetchOrders();
//     }, [token]);

//     useEffect(() => {
//         applyFilters(orders);
//     }, [dateRange, statusFilter, searchQuery]);

//     const fetchOrders = async () => {
//         try {
//             const response = await axios.post(
//                 `${backendUrl}/api/order/list`,
//                 {},
//                 { headers: { token }, timeout: 10000 }
//             );
//             if (response.data.success) {
//                 const data = response.data.orders || [];
//                 setOrders(data);
//                 calculateStats(data);
//                 applyFilters(data);
//             } else {
//                 toast.error(response.data.message);
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error("Failed to fetch data.");
//         }
//     };

//     const calculateStats = (orders) => {
//         let totalRevenue = 0;
//         let paidOrders = 0;
//         let unpaidOrders = 0;
//         const orderStatusCount = {};
//         const paymentMethods = {};

//         orders.forEach((order) => {
//             totalRevenue += order.amount;
//             if (order.payment) paidOrders++;
//             else unpaidOrders++;

//             orderStatusCount[order.status] = (orderStatusCount[order.status] || 0) + 1;
//             paymentMethods[order.paymentMethod] =
//                 (paymentMethods[order.paymentMethod] || 0) + 1;
//         });

//         setStats({
//             totalOrders: orders.length,
//             totalRevenue,
//             paidOrders,
//             unpaidOrders,
//             orderStatusCount,
//             paymentMethods,
//         });
//     };

//     const applyFilters = (data) => {
//         const filtered = data.filter((order) => {
//             const orderDate = new Date(order.date);
//             const matchesDateRange =
//                 orderDate >= dateRange.startDate && orderDate <= dateRange.endDate;
//             const matchesStatus = !statusFilter || order.status === statusFilter;
//             const matchesSearch =
//                 !searchQuery ||
//                 `${order.address.firstName} ${order.address.lastName}`
//                     .toLowerCase()
//                     .includes(searchQuery.toLowerCase());
//             return matchesDateRange && matchesStatus && matchesSearch;
//         });

//         setFilteredOrders(filtered);
//     };

//     const currentOrders = filteredOrders.slice(
//         (currentPage - 1) * ordersPerPage,
//         currentPage * ordersPerPage
//     );

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

// const StatCard = ({ label, value, color }) => (
//     <div className={`p-4 ${color} text-white rounded shadow`}>
//         <p className="text-lg">{label}</p>
//         <p className="text-2xl font-bold">{value}</p>
//     </div>
// );

// const ChartCard = ({ title, children }) => (
//     <div className="bg-white p-4 shadow rounded">
//         <h3 className="text-lg font-semibold mb-3">{title}</h3>
//         {children}
//     </div>
// );

// const Pagination = ({ totalItems, itemsPerPage }) => {
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     return (
//         <div className="flex justify-center items-center mt-4">
//             <button
//                 onClick={() => paginate(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 border rounded mr-2 disabled:opacity-50"
//             >
//                 <ChevronLeft />
//             </button>
//             <span>
//                 Page {currentPage} of {totalPages}
//             </span>
//             <button
//                 onClick={() => paginate(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 border rounded ml-2 disabled:opacity-50"
//             >
//                 <ChevronRight />
//             </button>
//         </div>
//     );
// };

//     return (
//         <div className="container mx-auto p-6">
//             <h2 className="text-3xl font-semibold mb-6 text-center">Dashboard Overview</h2>

//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//                 <StatCard label="Total Orders" value={stats.totalOrders} color="bg-blue-500" />
//                 <StatCard
//                     label="Total Revenue"
//                     value={`${currency}${stats.totalRevenue.toLocaleString()}`}
//                     color="bg-green-500"
//                 />
//                 <StatCard label="Paid Orders" value={stats.paidOrders} color="bg-yellow-500" />
//                 <StatCard label="Unpaid Orders" value={stats.unpaidOrders} color="bg-red-500" />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <ChartCard title="Order Status">
//                     <Bar
//                         data={{
//                             labels: Object.keys(stats.orderStatusCount),
//                             datasets: [
//                                 {
//                                     label: "Orders",
//                                     data: Object.values(stats.orderStatusCount),
//                                     backgroundColor: ["#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
//                                 },
//                             ],
//                         }}
//                     />
//                 </ChartCard>
//                 <ChartCard title="Payment Methods">
//                     <Pie
//                         data={{
//                             labels: Object.keys(stats.paymentMethods),
//                             datasets: [
//                                 {
//                                     data: Object.values(stats.paymentMethods),
//                                     backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
//                                 },
//                             ],
//                         }}
//                     />
//                 </ChartCard>
//             </div>
//             <div className="flex flex-wrap gap-4 mb-6">
//                 <div className="flex items-center">
//                     <Calendar className="mr-2" />
//                     <input
//                         type="date"
//                         value={dateRange.startDate.toISOString().split('T')[0]}
//                         onChange={(e) => setDateRange({
//                             ...dateRange,
//                             startDate: new Date(e.target.value)
//                         })}
//                         className="border rounded p-2"
//                     />
//                     <span className="mx-2">to</span>
//                     <input
//                         type="date"
//                         value={dateRange.endDate.toISOString().split('T')[0]}
//                         onChange={(e) => setDateRange({
//                             ...dateRange,
//                             endDate: new Date(e.target.value)
//                         })}
//                         className="border rounded p-2"
//                     />
//                 </div>

//                 <div className="flex items-center">
//                     <Filter className="mr-2" />
//                     <select
//                         value={statusFilter}
//                         onChange={(e) => setStatusFilter(e.target.value)}
//                         className="border rounded p-2"
//                     >
//                         <option value="">All Statuses</option>
//                         {Object.keys(stats.orderStatusCount).map(status => (
//                             <option key={status} value={status}>{status}</option>
//                         ))}
//                     </select>
//                 </div>

//                 <div className="flex items-center">
//                     <Search className="mr-2" />
//                     <input
//                         type="text"
//                         placeholder="Search customers"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="border rounded p-2"
//                     />
//                 </div>
//             </div>

// <div className="bg-white shadow rounded p-4">
//     <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
//     <div className="overflow-x-auto">
//         <table className="table-auto w-full text-sm">
//             <thead className="bg-gray-200">
//                 <tr>
//                     <th className="p-2">Customer</th>
//                     <th className="p-2">Amount</th>
//                     <th className="p-2">Status</th>
//                     <th className="p-2">Date</th>
//                     <th className="p-2">Payment Method</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {currentOrders.map((order) => (
//                     <tr key={order._id} className="border-b text-center">
//                         <td className="p-2">
//                             {`${order.address.firstName} ${order.address.lastName}`}
//                         </td>
//                         <td className="p-2">
//                             {currency}
//                             {order.amount.toLocaleString()}
//                         </td>
//                         <td className="p-2">{order.status}</td>
//                         <td className="p-2">
//                             {new Date(order.date).toLocaleDateString()}
//                         </td>
//                         <td className="p-2">{order.paymentMethod}</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     </div>
//     <Pagination totalItems={filteredOrders.length} itemsPerPage={ordersPerPage} />
// </div>
//         </div>
//     );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import {
    Calendar,
    Filter,
    Search,
    ChevronLeft,
    ChevronRight,
    X
} from "lucide-react";

const Dashboard = ({ token }) => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        paidOrders: 0,
        unpaidOrders: 0,
        orderStatusCount: {},
        paymentMethods: {},
    });
    const Pagination = ({ totalItems, itemsPerPage }) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        return (
            <div className="flex justify-center items-center mt-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded mr-2 disabled:opacity-50"
                >
                    <ChevronLeft />
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded ml-2 disabled:opacity-50"
                >
                    <ChevronRight />
                </button>
            </div>
        );
    };


    // Enhanced search state
    const [searchFilters, setSearchFilters] = useState({
        customerName: '',
        minAmount: '',
        maxAmount: '',
        paymentMethod: '',
    });

    const [dateRange, setDateRange] = useState({
        startDate: new Date(new Date().getFullYear(), 0, 1),
        endDate: new Date(),
    });
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    useEffect(() => {
        fetchOrders();
    }, [token]);

    useEffect(() => {
        applyFilters(orders);
    }, [dateRange, statusFilter, searchFilters]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/order/list`,
                {},
                { headers: { token }, timeout: 10000 }
            );
            if (response.data.success) {
                const data = response.data.orders || [];
                setOrders(data);
                calculateStats(data);
                applyFilters(data);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch data.");
        }
    };

    const calculateStats = (orders) => {
        let totalRevenue = 0;
        let paidOrders = 0;
        let unpaidOrders = 0;
        const orderStatusCount = {};
        const paymentMethods = {};

        orders.forEach((order) => {
            totalRevenue += order.amount;
            if (order.payment) paidOrders++;
            else unpaidOrders++;

            orderStatusCount[order.status] = (orderStatusCount[order.status] || 0) + 1;
            paymentMethods[order.paymentMethod] =
                (paymentMethods[order.paymentMethod] || 0) + 1;
        });

        setStats({
            totalOrders: orders.length,
            totalRevenue,
            paidOrders,
            unpaidOrders,
            orderStatusCount,
            paymentMethods,
        });
    };

    const applyFilters = (data) => {
        const filtered = data.filter((order) => {
            const orderDate = new Date(order.date);
            const matchesDateRange =
                orderDate >= dateRange.startDate && orderDate <= dateRange.endDate;

            const matchesStatus = !statusFilter || order.status === statusFilter;

            const matchesCustomerName =
                !searchFilters.customerName ||
                `${order.address.firstName} ${order.address.lastName}`
                    .toLowerCase()
                    .includes(searchFilters.customerName.toLowerCase());

            const matchesMinAmount =
                !searchFilters.minAmount ||
                order.amount >= parseFloat(searchFilters.minAmount);

            const matchesMaxAmount =
                !searchFilters.maxAmount ||
                order.amount <= parseFloat(searchFilters.maxAmount);

            const matchesPaymentMethod =
                !searchFilters.paymentMethod ||
                order.paymentMethod === searchFilters.paymentMethod;

            return (
                matchesDateRange &&
                matchesStatus &&
                matchesCustomerName &&
                matchesMinAmount &&
                matchesMaxAmount &&
                matchesPaymentMethod
            );
        });

        setFilteredOrders(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    };

    const clearAllFilters = () => {
        setSearchFilters({
            customerName: '',
            minAmount: '',
            maxAmount: '',
            paymentMethod: '',
        });
        setStatusFilter('');
        setDateRange({
            startDate: new Date(new Date().getFullYear(), 0, 1),
            endDate: new Date(),
        });
    };

    const currentOrders = filteredOrders.slice(
        (currentPage - 1) * ordersPerPage,
        currentPage * ordersPerPage
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Simplified components (keep existing ones from previous implementation)
    const StatCard = ({ label, value, color }) => (
        <div className={`p-4 ${color} text-white rounded shadow`}>
            <p className="text-lg">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );

    const ChartCard = ({ title, children }) => (
        <div className="bg-white p-4 shadow rounded">
            <h3 className="text-lg font-semibold mb-3">{title}</h3>
            {children}
        </div>
    );

    // ... (StatCard, ChartCard, Pagination components remain the same)

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold mb-6 text-center">Dashboard Overview</h2>

            {/* Previous stats and charts sections remain the same */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <StatCard label="Total Orders" value={stats.totalOrders} color="bg-blue-500" />
                <StatCard
                    label="Total Revenue"
                    value={`${currency}${stats.totalRevenue.toLocaleString()}`}
                    color="bg-green-500"
                />
                <StatCard label="Paid Orders" value={stats.paidOrders} color="bg-yellow-500" />
                <StatCard label="Unpaid Orders" value={stats.unpaidOrders} color="bg-red-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <ChartCard title="Order Status">
                    <Bar
                        data={{
                            labels: Object.keys(stats.orderStatusCount),
                            datasets: [
                                {
                                    label: "Orders",
                                    data: Object.values(stats.orderStatusCount),
                                    backgroundColor: ["#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
                                },
                            ],
                        }}
                    />
                </ChartCard>
                <ChartCard title="Payment Methods">
                    <Pie
                        data={{
                            labels: Object.keys(stats.paymentMethods),
                            datasets: [
                                {
                                    data: Object.values(stats.paymentMethods),
                                    backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
                                },
                            ],
                        }}
                    />
                </ChartCard>
            </div>
            {/* <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                    <Calendar className="mr-2" />
                    <input
                        type="date"
                        value={dateRange.startDate.toISOString().split('T')[0]}
                        onChange={(e) => setDateRange({
                            ...dateRange,
                            startDate: new Date(e.target.value)
                        })}
                        className="border rounded p-2"
                    />
                    <span className="mx-2">to</span>
                    <input
                        type="date"
                        value={dateRange.endDate.toISOString().split('T')[0]}
                        onChange={(e) => setDateRange({
                            ...dateRange,
                            endDate: new Date(e.target.value)
                        })}
                        className="border rounded p-2"
                    />
                </div>
            </div> */}

            {/* Enhanced Search and Filtering Section */}
            <div className="bg-white shadow rounded p-4 mb-6">
                <h3 className="text-xl font-semibold mb-4">Advanced Search</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Customer Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Customer Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchFilters.customerName}
                                onChange={(e) => setSearchFilters(prev => ({
                                    ...prev,
                                    customerName: e.target.value
                                }))}
                                className="mt-1 block w-full border rounded p-2"
                            />
                            {searchFilters.customerName && (
                                <button
                                    onClick={() => setSearchFilters(prev => ({
                                        ...prev,
                                        customerName: ''
                                    }))}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                >
                                    <X size={16} className="text-gray-500" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Min Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Min Amount
                        </label>
                        <input
                            type="number"
                            placeholder="Minimum amount"
                            value={searchFilters.minAmount}
                            onChange={(e) => setSearchFilters(prev => ({
                                ...prev,
                                minAmount: e.target.value
                            }))}
                            className="mt-1 block w-full border rounded p-2"
                        />
                    </div>

                    {/* Max Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Max Amount
                        </label>
                        <input
                            type="number"
                            placeholder="Maximum amount"
                            value={searchFilters.maxAmount}
                            onChange={(e) => setSearchFilters(prev => ({
                                ...prev,
                                maxAmount: e.target.value
                            }))}
                            className="mt-1 block w-full border rounded p-2"
                        />
                    </div>

                    {/* Payment Method */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Payment Method
                        </label>
                        <select
                            value={searchFilters.paymentMethod}
                            onChange={(e) => setSearchFilters(prev => ({
                                ...prev,
                                paymentMethod: e.target.value
                            }))}
                            className="mt-1 block w-full border rounded p-2"
                        >
                            <option value="">All Methods</option>
                            {Object.keys(stats.paymentMethods).map(method => (
                                <option key={method} value={method}>{method}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Filter Summary and Clear Button */}
                <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                        {filteredOrders.length} orders found
                    </div>
                    <button
                        onClick={clearAllFilters}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        Clear All Filters
                    </button>
                </div>
            </div>

            {/* Recent Orders and Pagination sections remain the same */}
            <div className="bg-white shadow rounded p-4">
                <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
                {/* Existing orders table */}
                <div className="bg-white shadow rounded p-4">
                    <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full text-sm">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-2">Customer</th>
                                    <th className="p-2">Amount</th>
                                    <th className="p-2">Status</th>
                                    <th className="p-2">Date</th>
                                    <th className="p-2">Payment Method</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.map((order) => (
                                    <tr key={order._id} className="border-b text-center">
                                        <td className="p-2">
                                            {`${order.address.firstName} ${order.address.lastName}`}
                                        </td>
                                        <td className="p-2">
                                            {currency}
                                            {order.amount.toLocaleString()}
                                        </td>
                                        <td className="p-2">{order.status}</td>
                                        <td className="p-2">
                                            {new Date(order.date).toLocaleDateString()}
                                        </td>
                                        <td className="p-2">{order.paymentMethod}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination totalItems={filteredOrders.length} itemsPerPage={ordersPerPage} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
