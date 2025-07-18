const express = require('express');
const { addCart, getCart, updateCart, deleteCart } = require('../controllers/CartController.js');
const auth = require('../auth/authMiddleware.js');

const router = express.Router();

router.post('/add-cart', auth, addCart);
router.get('/get-cart', auth, getCart);
router.put('/cart/:productId', auth, updateCart);
router.delete('/cart/:productId', auth, deleteCart);

module.exports = router;
