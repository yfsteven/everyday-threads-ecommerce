const pool = require('../config/db');

exports.createOrder = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { customerEmail, shippingAddress, items } = req.body;
    if (!customerEmail || !shippingAddress || !items || items.length === 0) {
      const err = new Error('Customer email, shipping address, and items are required');
      err.statusCode = 400;
      throw err;
    }

    let totalPrice = 0;
    for (const item of items) {
      const productResult = await pool.query(
        'SELECT price FROM products WHERE id = $1',
        [item.productId]
      );

      if (productResult.rows.length === 0) {
        const err = new Error(`Product with id ${item.productId} not found`);
        err.statusCode = 404;
        throw err;
      }

      const price = parseFloat(productResult.rows[0].price);
      totalPrice += price * item.quantity;
    }

    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, customer_email, shipping_address, order_status, total_price)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, user_id, customer_email, shipping_address, order_status, total_price, created_at`,
      [userId, customerEmail, shippingAddress, 'pending', totalPrice]
    );

    const order = orderResult.rows[0];

    for (const item of items) {
      const productResult = await pool.query(
        'SELECT price FROM products WHERE id = $1',
        [item.productId]
      );

      const priceAtPurchase = parseFloat(productResult.rows[0].price);

      await pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
         VALUES ($1, $2, $3, $4)`,
        [order.id, item.productId, item.quantity, priceAtPurchase]
      );

      await pool.query(
        'UPDATE products SET inventory_count = inventory_count - $1 WHERE id = $2',
        [item.quantity, item.productId]
      );
    }

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: order.id,
        userId: order.user_id,
        customerEmail: order.customer_email,
        shippingAddress: order.shipping_address,
        orderStatus: order.order_status,
        totalPrice: order.total_price,
        createdAt: order.created_at,
        items,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      `SELECT id, user_id, customer_email, shipping_address, order_status, total_price, created_at
       FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    res.status(200).json({
      orders: result.rows.map((order) => ({
        id: order.id,
        userId: order.user_id,
        customerEmail: order.customer_email,
        shippingAddress: order.shipping_address,
        orderStatus: order.order_status,
        totalPrice: order.total_price,
        createdAt: order.created_at,
      })),
    });
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    if (isNaN(Number(id))) {
      const err = new Error('Invalid order id');
      err.statusCode = 400;
      throw err;
    }

    const orderResult = await pool.query(
      `SELECT id, user_id, customer_email, shipping_address, order_status, total_price, created_at
       FROM orders
       WHERE id = $1`,
      [id]
    );

    if (orderResult.rows.length === 0) {
      const err = new Error('Order not found');
      err.statusCode = 404;
      throw err;
    }

    const order = orderResult.rows[0];

    if (order.user_id !== userId) {
      const err = new Error('Unauthorized: You cannot view this order');
      err.statusCode = 403;
      throw err;
    }

    const itemsResult = await pool.query(
      `SELECT oi.id, oi.product_id, oi.quantity, oi.price_at_purchase, p.name, p.image_url
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = $1`,
      [id]
    );

    res.status(200).json({
      order: {
        id: order.id,
        userId: order.user_id,
        customerEmail: order.customer_email,
        shippingAddress: order.shipping_address,
        orderStatus: order.order_status,
        totalPrice: order.total_price,
        createdAt: order.created_at,
        items: itemsResult.rows.map((item) => ({
          id: item.id,
          productId: item.product_id,
          productName: item.name,
          productImage: item.image_url,
          quantity: item.quantity,
          priceAtPurchase: item.price_at_purchase,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT id, user_id, customer_email, shipping_address, order_status, total_price, created_at
       FROM orders
       ORDER BY created_at DESC`
    );

    res.status(200).json({
      orders: result.rows.map((order) => ({
        id: order.id,
        userId: order.user_id,
        customerEmail: order.customer_email,
        shippingAddress: order.shipping_address,
        orderStatus: order.order_status,
        totalPrice: order.total_price,
        createdAt: order.created_at,
      })),
    });
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    if (isNaN(Number(id))) {
      const err = new Error('Invalid order id');
      err.statusCode = 400;
      throw err;
    }

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!orderStatus || !validStatuses.includes(orderStatus)) {
      const err = new Error(`Order status must be one of: ${validStatuses.join(', ')}`);
      err.statusCode = 400;
      throw err;
    }

    const result = await pool.query(
      `UPDATE orders
       SET order_status = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING id, user_id, customer_email, shipping_address, order_status, total_price, created_at, updated_at`,
      [orderStatus, id]
    );

    if (result.rows.length === 0) {
      const err = new Error('Order not found');
      err.statusCode = 404;
      throw err;
    }

    const order = result.rows[0];

    res.status(200).json({
      message: 'Order status updated successfully',
      order: {
        id: order.id,
        userId: order.user_id,
        customerEmail: order.customer_email,
        shippingAddress: order.shipping_address,
        orderStatus: order.order_status,
        totalPrice: order.total_price,
        createdAt: order.created_at,
        updatedAt: order.updated_at,
      },
    });
  } catch (error) {
    next(error);
  }
};
