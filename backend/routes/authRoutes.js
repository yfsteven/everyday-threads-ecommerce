const express = require('express');
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/me', verifyToken, authController.getCurrentUser);

router.put('/profile', verifyToken, authController.updateProfile);

module.exports = router;
