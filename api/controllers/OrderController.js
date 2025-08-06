const midtransClient = require('midtrans-client');
const OrderModel = require('../models/OrderModel.js');
const UserModel = require('../models/UserModel.js');
require('dotenv').config();

// Konfigurasi Midtrans
let snap = new midtransClient.Snap({
  isProduction: false, // set ke true kalau udah live
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

const createOrder = async (req, res) => {
  try {
    const { userId, items, paymentMethod, street, city, state, zipcode, country, phone } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const amount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping_fee = parseFloat((amount * 0.1).toFixed(2));
    const total_fee = parseFloat((amount + shipping_fee).toFixed(2));

    const allowedBanks = ['bca', 'bni', 'bri', 'permata', 'mandiri'];
    const selectedBank = paymentMethod.toLowerCase();

    if (!allowedBanks.includes(selectedBank)) {
      return res.status(400).json({ success: false, message: 'Bank tidak didukung' });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const userName = user.name;

    // Save to database
    const newOrder = new OrderModel({
      userId,
      userName,
      items,
      amount,
      shipping_fee,
      total_fee,
      status: 'Order Placed',
      paymentMethod,
      payment: false,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
    });

    const savedOrder = await newOrder.save();

    // Siapkan parameter buat Midtrans
    const parameter = {
      transaction_details: {
        order_id: `ORDER-${savedOrder._id}`,
        gross_amount: total_fee,
      },
      customer_details: {
        first_name: user.name,
        phone,
        email: user.email,
      },
      item_details: [
        ...items.map((item) => ({
          id: item._id,
          price: item.price,
          quantity: item.quantity,
          name: item.name,
        })),
        {
          id: 'SHIPPING_FEE',
          price: shipping_fee,
          quantity: 1,
          name: 'Shipping Fee',
        },
      ],
      enabled_payments: ['bank_transfer'],
      callbacks: {
        finish: `http://localhost:5173/orders`,
      },
    };

    // Generate snap token
    const transaction = await snap.createTransaction(parameter);
    const transactionToken = transaction.token;

    return res.status(200).json({
      success: true,
      message: 'Order created and payment initiated',
      transactionToken,
      orderId: savedOrder._id,
      redirect_url: transaction.redirect_url, // useful for frontend
    });
  } catch (error) {
    console.error('Create Order Error:', error);
    res.status(500).json({ success: false, message: 'Failed to create order' });
  }
};

// for admin
const allOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Failed to fetch data: ', error);
    res.status(500).json({ success: false, message: 'Failed to fetch data' });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await OrderModel.find({ userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Failed to fetch data: ', error);
    res.status(500).json({ success: false, message: 'Failed to fetch data' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findById(id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found!' });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error('Failed to fetch data: ', error);
    res.status(500).json({ success: false, message: 'Failed to fetch data' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await OrderModel.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const midtransNotification = async (req, res) => {
  try {
    const notification = req.body;

    const { order_id, transaction_status, va_numbers } = notification;

    if (!order_id.startsWith('ORDER-')) {
      console.warn('Order ID dari Midtrans tidak valid:', order_id);
      return res.status(200).json({ message: 'Ignored non-applicable notification' });
    }

    const orderId = order_id.replace('ORDER-', '');

    if (transaction_status === 'settlement') {
      const order = await OrderModel.findById(orderId);
      if (!order) return res.status(404).json({ message: 'Order not found' });

      const bankUsed = va_numbers && va_numbers.length > 0 ? va_numbers[0].bank : null;

      const updateData = {
        status: 'Packing',
        payment: true,
      };

      if (bankUsed) {
        updateData.paymentMethod = bankUsed;
      }

      try {
        await OrderModel.findByIdAndUpdate(orderId, updateData);
        await UserModel.findByIdAndUpdate(order.userId, { $set: { cartData: [] } });
      } catch (err) {
        console.error('Failed to update order:', err);
      }
    }

    return res.status(200).json({ message: 'OK' });
  } catch (error) {
    console.error('Midtrans Webhook Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createOrder, allOrders, userOrders, getOrderById, updateOrderStatus, midtransNotification };
