const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const Product = require("../models/Product");
const { verifyTokenAndAdmin, verifyToken } = require("../middleware/auth");
const dotenv = require("dotenv");
dotenv.config({ path: "../config/config.env" });

const upload = require("../middleware/fileUploads");

// @ route GET api/products
// @ desc  Get all products
// @ access Private
router.get("/",  async (req, res) => {
  const queryNew = req.query.new;
  const queryCollections = req.query.collection;
  try {
    let products;
    if (queryNew) {
      products = await Product.find().sort({ _id: -1 }).limit(5);
    }
    if (queryCollections) {
      products = await Product.find({ company: { $in: [queryCollections] } });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @ route GET api/products
// @ desc  Get product
// @ access Private
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ msg: "product doesn't exist" });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @ route POST api/products
// @ desc  Create new product
// @ access Private
// @route POST api/products
// @desc  Create new product
// @access Private
router.post(
  '/',
  upload, // Handle file upload
  [
    body('company', 'Please enter a company name').not().isEmpty(),
    body('title', 'Please enter a title').not().isEmpty(),
    body('desc', 'Please enter a description').not().isEmpty(),
    body('price', 'Please enter a price').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { company, title, desc, alt, categories, size, price, discountPrice, slug } = req.body;
      const imgPath = req.file ? `/uploads/${req.file.filename}` : '';

      const newProduct = new Product({
        company,
        title,
        desc,
        img: imgPath,
        alt,
        categories: JSON.parse(categories),
        size: JSON.parse(size),
        price,
        discountPrice,
        slug
      });

      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @ route    PUT api/product
// @desc      Update product
// @ access   Private
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ msg: "product doesn't exist" });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @ route    DELETE api/auth
// @ desc     Delete product
// @ access   Private
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(400).json({ msg: "product doesn't exist" });
    res.status(200).json({ msg: "Product is successfully deleted" });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ msg: "product doesn't exist" });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
