const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all products
router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY created_at DESC'
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});

// Get one product by id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      const err = new Error('Invalid product id');
      err.statusCode = 400;
      throw err;
    }

    const result = await pool.query('SELECT * FROM products WHERE id = $1', [
      id,
    ]);

    if (result.rows.length === 0) {
      const err = new Error('Product not found');
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;