const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ADD sample products (run once)
router.post("/seed", async (req, res) => {
  await Product.insertMany([
    {
      name: "Laptop",
      price: 50000,
      image: "https://via.placeholder.com/150",
      category: "Electronics",
    },
    {
      name: "Mobile",
      price: 20000,
      image: "https://via.placeholder.com/150",
      category: "Electronics",
    },
    {
      name: "Shoes",
      price: 3000,
      image: "https://via.placeholder.com/150",
      category: "Fashion",
    },
  ]);

  res.json({ message: "Products added" });
});

module.exports = router;