import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  // State to hold the cart items
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("")

  // Function to add an item to the cart
  const addToCart = async (itemId, size) => {
    // Check if a size was selected
    if (!size) {
      // If no size was selected, show an error message
      toast.error("Please select a size");
      return;
    }

    // Create a copy of the current cart items
    let cartData = structuredClone(cartItems);

    // Check if the item is already in the cart
    if (cartData[itemId]) {
      // If the item is already in the cart, increment the quantity for the selected size
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        // If the size is not in the cart yet, initialize it to 1
        cartData[itemId][size] = 1;
      }
    } else {
      // If the item is not in the cart yet, add it with the selected size and quantity of 1
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    // Update the cart items state
    setCartItems(cartData);

    if (token) {
      try {

        await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })

      } catch (error) {
        console.log(error);
        toast.error(error.message)

      }
    }
  };

  const getCartCount = () => {
    // Initialize a variable to hold the total count of items
    let totalCount = 0;

    // Loop through each item in the cartItems object
    for (const items in cartItems) {
      // Loop through each size of the current item
      for (const item in cartItems[items]) {
        try {
          // Check if the quantity of the current size is greater than 0
          if (cartItems[items][item] > 0) {
            // Add the quantity of the current size to the total count
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          // If there is an error (e.g., accessing properties), it will be caught here
          // However, no specific error handling is performed
          console.log(error);
        }
      }
    }

    // Return the total count of items in the cart
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    if (token) {
      try {

        await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })

      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
  };

  const getUserCart = async (token) => {
    try {

      const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
      if (response.data.success) {
        setCartItems(response.data.cartData)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          // If there is an error (e.g., accessing properties), it will be caught here
          // However, no specific error handling is performed
          console.log(error);

        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {

      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setProducts(response.data.products)
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getProductsData()
  }, [])

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'));
    }
  }, [])
  // Effect to log the cart items whenever they change
  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
