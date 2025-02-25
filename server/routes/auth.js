const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middleware/auth");
const User = require("../models/User");
const dotenv = require("dotenv");
require("dotenv").config();

const upload = require("../middleware/fileUploads");

const uploadImage = async (req, res, next) => {


  if (!req.file) {
      return res.status(400).send({ message: "Please upload a file" });
  }
  res.status(200).json({
      success: true,
      data: req.file.filename,
  });
}


router.post("/uploadImage", upload, uploadImage);



// @ route    GET api/auth
// @desc      Get logged in user
// @ access   Private
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({ msg: "user doesn't exist" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



// @ route    POST api/auth
// @ desc     authenticate (Login) user & get token
// @ access   Public

router.post(
  "/",
  body("email", "Please include a valid email").isEmail(),
  body("password", "Password is required").exists(),
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const payload = {
        user: {
          id: user.id,
          isAdmin: user.isAdmin,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET || 'secret', // Use an environment variable or a default secret
        { expiresIn: '1h' }, // Use a more secure expiration time
        (error, token) => {
          if (error) {
            console.error('JWT Error:', error);
            return res.status(500).json({ msg: 'Server Error' });
          }

          // Exclude the password field from the response
          const { password, ...userData } = user.toObject(); 
          res.json({
            token,
            user: userData,
          });
        }
      );
    } catch (err) {
      console.error('Server Error:', err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @ route    PUT api/auth
// @desc      Update user
// @ access   Private
router.put("/:id", async (req, res) => {
  try {
    const { password, currentPassword, ...others } = req.body;
    const user = await User.findById(req.params.id);
    let newPassword;
    // if (!user) {
    //   return res.status(400).json({ msg: "user doesn't exist" });
    // }
    if (password) {
      let salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(req.body.password, salt);
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Old password isn't correct" });
      }
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          ...others,
          password: newPassword,
        },
      },
      // To ensure it returns the updated User
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ msg: "user doesn't exist" });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @ route    DELETE api/auth
// @ desc     Delete user
// @ access   Private
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(400).json({ msg: "user doesn't exist" });
    }
    res.status(200).json({ msg: "User is successfully deleted" });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ msg: "user doesn't exist" });
    }
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
