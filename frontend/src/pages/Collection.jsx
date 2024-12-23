
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  // Centralized filter and sort state
  const [filters, setFilters] = useState({
    categories: [],
    subCategories: [],
    priceRange: {
      min: 0,
      max: Infinity
    }
  });
  const [sortType, setSortType] = useState("relevant");

  // Filter configurations
  const filterConfig = {
    categories: [
      { value: "Men", label: "Men" },
      { value: "Women", label: "Women" },
      { value: "Kid", label: "Kid" }
    ],
    subCategories: [
      { value: "Topwear", label: "Topwear" },
      { value: "Bottomwear", label: "Bottomwear" },
      { value: "Winterwear", label: "Winterwear" }
    ]
  };

  // Sorting methods object
  const sortMethods = {
    "relevant": () => applyFilter(),
    "low-high": (products) => [...products].sort((a, b) => a.price - b.price),
    "high-low": (products) => [...products].sort((a, b) => b.price - a.price),
    "newest": (products) => [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    "a-z": (products) => [...products].sort((a, b) => a.name.localeCompare(b.name)),
    "z-a": (products) => [...products].sort((a, b) => b.name.localeCompare(a.name))
  };

  // Toggle filter method
  const toggleFilter = (filterType, value) => {
    setFilters(prev => {
      const currentFilters = prev[filterType];
      return {
        ...prev,
        [filterType]: currentFilters.includes(value)
          ? currentFilters.filter(item => item !== value)
          : [...currentFilters, value]
      };
    });
  };

  // Price range change handler
  const handlePriceRangeChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: Number(value)
      }
    }));
  };

  // Apply filters
  const applyFilter = () => {
    let filteredProducts = [...products];

    // Search filter
    if (showSearch && search) {
      filteredProducts = filteredProducts.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filteredProducts = filteredProducts.filter(item =>
        filters.categories.includes(item.category)
      );
    }

    // Subcategory filter
    if (filters.subCategories.length > 0) {
      filteredProducts = filteredProducts.filter(item =>
        filters.subCategories.includes(item.subCategory)
      );
    }

    // Price range filter
    filteredProducts = filteredProducts.filter(item =>
      item.price >= filters.priceRange.min &&
      item.price <= filters.priceRange.max
    );

    return filteredProducts;
  };

  // Sort Products
  const sortProducts = (productsToSort) => {
    const sortMethod = sortMethods[sortType];
    return sortMethod ? sortMethod(productsToSort) : productsToSort;
  };

  // Main sorting and filtering effect
  useEffect(() => {
    const filteredProducts = applyFilter();
    const sortedProducts = sortProducts(filteredProducts);
    setFilterProducts(sortedProducts);
  }, [filters, search, showSearch, products, sortType]);

  // Render filter section
  const renderFilterSection = (title, filterType, options) => (
    <div
      className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? " " : "hidden"} sm:block`}
    >
      <p className="mb-3 text-sm font-medium">{title}</p>
      <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
        {options.map((option) => (
          <p key={option.value} className="flex gap-2">
            <input
              className="w-3"
              type="checkbox"
              value={option.value}
              checked={filters[filterType].includes(option.value)}
              onChange={() => toggleFilter(filterType, option.value)}
            />{" "}
            {option.label}
          </p>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTER
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Categories Filter */}
        {renderFilterSection("CATEGORIES", "categories", filterConfig.categories)}

        {/* Subcategories Filter */}
        {renderFilterSection("TYPE", "subCategories", filterConfig.subCategories)}

        {/* Price Range Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? " " : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">PRICE RANGE</p>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder='min'
              className="w-20 border p-1"
              value={filters.priceRange.min}
              // value={filters.priceRange.max === Infinity ? '' : filters.priceRange.min}
              onChange={(e) => handlePriceRangeChange('min', e.target.value)}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              className="w-20 border p-1"
              value={filters.priceRange.max === Infinity ? '' : filters.priceRange.max}
              onChange={(e) => handlePriceRangeChange('max', e.target.value || Infinity)}
            />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTION"} />
          {/* Product Sort */}
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Price Low to High</option>
            <option value="high-low">Sort by: Price High to Low</option>
            <option value="newest">Sort by: Newest</option>
            <option value="a-z">Sort by: Name A-Z</option>
            <option value="z-a">Sort by: Name Z-A</option>
          </select>
        </div>

        {/* Products Display */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                name={item.name}
                id={item._id}
                image={item.image}
                price={item.price}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              No products found matching your filters.
            </div>
          )}
        </div>
      </div>
      <df-messenger
        intent="WELCOME"
        chat-title="Test_ai_chat"
        agent-id="6c58e675-abcd-4013-a456-7f26e8666a14"
        language-code="en"
      ></df-messenger>
    </div>
  );
};

export default Collection;