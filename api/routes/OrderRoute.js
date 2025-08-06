const express = require('express');
const { createOrder, allOrders, userOrders, getOrderById, updateOrderStatus, midtransNotification } = require('../controllers/OrderController.js');
const auth = require('../auth/authMiddleware.js');

const router = express.Router();

router.post('/create-order', auth, createOrder);
router.get('/orders', auth, allOrders);
router.get('/orders/:userId', auth, userOrders);
router.get('/order-detail/:id', auth, getOrderById);
router.put('/orders/:id', auth, updateOrderStatus);
router.post('/midtrans-notification', midtransNotification);

module.exports = router;
