const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production';

exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const err = new Error('No authorization token provided');
      err.statusCode = 401;
      throw err;
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : authHeader;

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    const err = new Error('Invalid or expired token');
    err.statusCode = 401;
    next(err);
  }
};

exports.isAdmin = (req, res, next) => {
  if (!req.userRole || req.userRole !== 'admin') {
    const err = new Error('Admin access required');
    err.statusCode = 403;
    return next(err);
  }
  next();
};

exports.optionalVerifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : authHeader;

      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.userId;
      req.userRole = decoded.role;
    }
  } catch (error) {
  }
  next();
};
