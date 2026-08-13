const pool = require('../config/db');

exports.getAllProducts = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY created_at DESC'
    );
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
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
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, imageUrl, inventoryCount } = req.body;

    if (!name || !description || !price || !category || !imageUrl) {
      const err = new Error('Name, description, price, category, and image URL are required');
      err.statusCode = 400;
      throw err;
    }

    if (isNaN(Number(price)) || Number(price) < 0) {
      const err = new Error('Price must be a valid positive number');
      err.statusCode = 400;
      throw err;
    }

    const result = await pool.query(
      `INSERT INTO products (name, description, price, category, image_url, availability, inventory_count)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, name, description, price, category, image_url, availability, inventory_count, created_at, updated_at`,
      [name, description, price, category, imageUrl, true, inventoryCount || 10]
    );

    const product = result.rows[0];

    res.status(201).json({
      message: 'Product created successfully',
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        imageUrl: product.image_url,
        availability: product.availability,
        inventoryCount: product.inventory_count,
        createdAt: product.created_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, imageUrl, availability, inventoryCount } = req.body;

    if (isNaN(Number(id))) {
      const err = new Error('Invalid product id');
      err.statusCode = 400;
      throw err;
    }

    if (price !== undefined && (isNaN(Number(price)) || Number(price) < 0)) {
      const err = new Error('Price must be a valid positive number');
      err.statusCode = 400;
      throw err;
    }

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramCount++}`);
      values.push(name);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramCount++}`);
      values.push(description);
    }
    if (price !== undefined) {
      updates.push(`price = $${paramCount++}`);
      values.push(price);
    }
    if (category !== undefined) {
      updates.push(`category = $${paramCount++}`);
      values.push(category);
    }
    if (imageUrl !== undefined) {
      updates.push(`image_url = $${paramCount++}`);
      values.push(imageUrl);
    }
    if (availability !== undefined) {
      updates.push(`availability = $${paramCount++}`);
      values.push(availability);
    }
    if (inventoryCount !== undefined) {
      updates.push(`inventory_count = $${paramCount++}`);
      values.push(inventoryCount);
    }

    if (updates.length === 0) {
      const err = new Error('No fields to update');
      err.statusCode = 400;
      throw err;
    }

    updates.push('updated_at = NOW()');
    values.push(id);

    const query = `
      UPDATE products
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, name, description, price, category, image_url, availability, inventory_count, created_at, updated_at
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      const err = new Error('Product not found');
      err.statusCode = 404;
      throw err;
    }

    const product = result.rows[0];

    res.status(200).json({
      message: 'Product updated successfully',
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        imageUrl: product.image_url,
        availability: product.availability,
        inventoryCount: product.inventory_count,
        createdAt: product.created_at,
        updatedAt: product.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      const err = new Error('Invalid product id');
      err.statusCode = 400;
      throw err;
    }

    const result = await pool.query(
      'DELETE FROM products WHERE id = $1 RETURNING id, name',
      [id]
    );

    if (result.rows.length === 0) {
      const err = new Error('Product not found');
      err.statusCode = 404;
      throw err;
    }

    const product = result.rows[0];

    res.status(200).json({
      message: 'Product deleted successfully',
      product: {
        id: product.id,
        name: product.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.searchProducts = async (req, res, next) => {
  try {
    const { search, category, minPrice, maxPrice, sortBy } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';
    const values = [];
    let paramCount = 1;

    if (search) {
      query += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      values.push(`%${search}%`);
      paramCount++;
    }

    if (category) {
      query += ` AND category = $${paramCount}`;
      values.push(category);
      paramCount++;
    }

    if (minPrice !== undefined) {
      query += ` AND price >= $${paramCount}`;
      values.push(parseFloat(minPrice));
      paramCount++;
    }

    if (maxPrice !== undefined) {
      query += ` AND price <= $${paramCount}`;
      values.push(parseFloat(maxPrice));
      paramCount++;
    }

    switch (sortBy) {
      case 'price_asc':
        query += ' ORDER BY price ASC';
        break;
      case 'price_desc':
        query += ' ORDER BY price DESC';
        break;
      case 'name':
        query += ' ORDER BY name ASC';
        break;
      case 'newest':
        query += ' ORDER BY created_at DESC';
        break;
      default:
        query += ' ORDER BY created_at DESC';
    }

    const result = await pool.query(query, values);

    res.status(200).json({
      count: result.rows.length,
      products: result.rows,
    });
  } catch (error) {
    next(error);
  }
};
