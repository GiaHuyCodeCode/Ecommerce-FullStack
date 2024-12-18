import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";

// function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };
    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for list product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for removing product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for sign product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for dashboard statistics
const addDashboard = async (req, res) => {
  try {
    // Total number of products
    const totalProducts = await productModel.countDocuments();

    // Orders data
    const orders = await orderModel.find({});

    // Total revenue
    const totalRevenue = orders.reduce(
      (total, order) => total + order.amount,
      0
    );

    // Pending orders
    const pendingOrders = orders.filter(
      (order) => order.status === "Order Placed" || order.status === "Pending"
    ).length;

    // Orders grouped by status
    const ordersByStatus = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    // Get recent orders (last 5 orders)
    const recentOrders = await orderModel
      .find({})
      .sort({ date: -1 }) // Sort by most recent
      .limit(5)
      .select("userId amount status date"); // Select only necessary fields

    // Format statistics for the response
    const statistics = {
      totalProducts,
      totalRevenue,
      pendingOrders,
      ordersByStatus,
      recentOrders,
    };

    // Send response
    res.json({ success: true, statistics });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addDashboard, addProduct, listProduct, removeProduct, singleProduct };
