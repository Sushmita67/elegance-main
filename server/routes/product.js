const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Product = require("../models/Product");
const { verifyTokenAndAdmin, verifyToken } = require("../middleware/auth");
const dotenv = require("dotenv");

dotenv.config({ path: "../config/config.env" });

// Middleware for file uploads
const upload = require("../middleware/fileUploads");

// ✅ 1️⃣ GET All Products
router.get("/", async (req, res) => {
  const queryNew = req.query.new;
  const queryCollections = req.query.collection;
  try {
    let products;
    if (queryNew) {
      products = await Product.find().sort({ _id: -1 }).limit(5);
    } else if (queryCollections) {
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

// ✅ 2️⃣ NEW ROUTE: Get Unique Categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("categories");
    res.status(200).json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ✅ 3️⃣ GET Single Product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ msg: "Product doesn't exist" });
  }
});

// ✅ 4️⃣ CREATE New Product
router.post(
  "/",
  upload, // Handle file upload
  [
    body("company", "Please enter a company name").not().isEmpty(),
    body("title", "Please enter a title").not().isEmpty(),
    body("desc", "Please enter a description").not().isEmpty(),
    body("price", "Please enter a price").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { company, title, desc, alt, categories, size, price, discountPrice, slug } = req.body;
      const imgPath = req.file ? `/uploads/${req.file.filename}` : "";

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
        slug,
      });

      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// // ✅ 5️⃣ UPDATE Product
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     res.status(200).json(updatedProduct);
//   } catch (err) {
//     res.status(400).json({ msg: "Product doesn't exist" });
//   }
// });

// ✅ 5️⃣ UPDATE Product (with image upload)
router.put(
  "/:id",
  upload, // Handle file upload
  [
    body("company", "Please enter a company name").not().isEmpty(),
    body("title", "Please enter a title").not().isEmpty(),
    body("desc", "Please enter a description").not().isEmpty(),
    body("price", "Please enter a price").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { company, title, desc, alt, categories, size, price, discountPrice, slug } = req.body;
      const imgPath = req.file ? `/uploads/${req.file.filename}` : "";

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          company,
          title,
          desc,
          img: imgPath || undefined, // Only update image if a new one is uploaded
          alt,
          categories: JSON.parse(categories),
          size: JSON.parse(size),
          price,
          discountPrice,
          slug,
        },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ msg: "Product not found" });
      }

      res.status(200).json(updatedProduct);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// ✅ 6️⃣ PATCH Product (partial update)
router.patch(
  "/:id",
  upload, // Handle file upload
  async (req, res) => {
    try {
      const updates = { ...req.body };

      // Handle image upload if a new file is provided
      if (req.file) {
        updates.img = `/uploads/${req.file.filename}`;
      }

      // Parse JSON fields if they exist
      if (updates.categories) {
        updates.categories = JSON.parse(updates.categories);
      }
      if (updates.size) {
        updates.size = JSON.parse(updates.size);
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ msg: "Product not found" });
      }

      res.status(200).json(updatedProduct);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);



// ✅ 6️⃣ DELETE Product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(400).json({ msg: "Product doesn't exist" });
    res.status(200).json({ msg: "Product successfully deleted" });
  } catch (err) {
    res.status(400).json({ msg: "Product doesn't exist" });
  }
});

module.exports = router;
