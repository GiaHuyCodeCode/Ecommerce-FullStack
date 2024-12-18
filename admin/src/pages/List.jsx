// import axios from "axios";
// import { useEffect, useState } from "react";
// import { backendUrl, currency } from "../App";
// import { toast } from "react-toastify";
// const List = ({ token }) => {
//   const [list, setList] = useState([]);
//   const fetchList = async () => {
//     try {
//       const response = await axios.get(backendUrl + "/api/product/list");
//       if (response.data.success) {
//         setList(response.data.products);
//       }
//       else {
//         toast.error(response.data.message);
//       }
//       // console.log(response.data)
//     }
//     catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   }
//   const removeProduct = async (id) => {
//     try {
//       const response = await axios.post(backendUrl + "/api/product/remove/", { id }, { headers: { token } });
//       if (response.data.success) {
//         toast.success(response.data.message)
//         await fetchList();
//       }
//       else {
//         toast.error(response.data.message)
//       }
//     }
//     catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   }
//   useEffect(() => {
//     fetchList()
//   }, [])
//   return (
//     <>
//       <p className="mb-2">All Products List</p>
//       <div className="flex flex-col gap-2">
//         {/* ----------------------------LIST TABLE TITLE ------------------- */}
//         <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b className="text-center">Action</b>
//         </div>
//         {/* ----------------------------- Product List -------------------- */}
//         {list.map((item, index) => (
//           <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm" key={index}>
//             <img className="w-12" src={item.image[0]} alt="" />
//             <p>{item.name}</p>
//             <p>{item.category}</p>
//             <p>{currency}{item.price}</p>
//             <p onClick={() => removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg">X</p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };
// export default List;

import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const productsPerPage = 10;

  const fetchList = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
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

  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove/",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Filter and search products
  const filteredList = useMemo(() => {
    return list.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [list, searchTerm]);

  // Sort and paginate products
  const sortedAndPaginatedList = useMemo(() => {
    let sortableList = [...filteredList];

    sortableList.sort((a, b) => {
      if (sortConfig.key === "name") {
        return sortConfig.direction === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortConfig.key === "price") {
        return sortConfig.direction === "asc" ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });

    const startIndex = (currentPage - 1) * productsPerPage;
    return sortableList.slice(startIndex, startIndex + productsPerPage);
  }, [filteredList, sortConfig, currentPage]);

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <p className="mb-2">All Products List</p>

      {/* Search and sort controls */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />
        <div className="flex space-x-2">
          <select
            onChange={(e) => setSortConfig({ ...sortConfig, key: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </select>
          <button
            onClick={() =>
              setSortConfig((prev) => ({
                ...prev,
                direction: prev.direction === "asc" ? "desc" : "asc",
              }))
            }
            className="p-2 border rounded"
          >
            {sortConfig.direction === "asc" ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {/* Loading or error notifications */}
      {isLoading && (
        <div className="text-center py-4">
          <p>Loading products...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Product list */}
      {!isLoading && !error && (
        <div className="flex flex-col gap-2">
          <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className="text-center">Action</b>
          </div>
          {sortedAndPaginatedList.length > 0 ? (
            sortedAndPaginatedList.map((item, index) => (
              <div
                className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
                key={index}
              >
                <img className="w-12" src={item.image[0]} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{currency}{item.price}</p>
                <p
                  onClick={() => removeProduct(item._id)}
                  className="text-right md:text-center cursor-pointer text-lg text-red-500"
                >
                  X
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">No products found</div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !error && filteredList.length > productsPerPage && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: Math.ceil(filteredList.length / productsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
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

export default List;
