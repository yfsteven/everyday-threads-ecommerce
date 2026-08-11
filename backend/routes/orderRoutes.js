const express = require("express");

const router = express.Router();

// Create a new order
router.post("/", async (req, res, next) => {
  try {
    const { customerName, email, shippingAddress, items } = req.body;

    // Basic validation
    if (!customerName || !email || !shippingAddress || !items) {
      return res.status(400).json({
        error: "Missing required order information",
      });
    }

    // Database logic will go here later

    res.status(201).json({
      message: "Order created successfully",
      order: {
        customerName,
        email,
        shippingAddress,
        items,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;