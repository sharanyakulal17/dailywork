const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// SEED PRODUCTS
router.get("/seed", async (req, res) => {
  try {
    await Product.deleteMany();

    const products = await Product.insertMany([
      {
        name: "iPhone 15",
        price: 80000,
        image: "https://via.placeholder.com/150"
      },
      {
        name: "Laptop",
        price: 60000,
        image: "https://via.placeholder.com/150"
      }
    ]);

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;