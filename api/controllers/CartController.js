const UserModel = require('../models/UserModel.js');
const ProductModel = require('../models/ProductModel.js');

const addCart = async (req, res) => {
  const { productId, quantity, size } = req.body;
  const userId = req.user.id;

  try {
    const user = await UserModel.findById(userId);

    // update cartData
    user.cartData[productId] = { quantity, size };
    await user.save();

    res.status(200).json({ msg: 'Item added to cart', cartData: user.cartData });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await UserModel.findById(userId);
    const cart = user.cartData;

    const productIds = Object.keys(cart);
    const products = await ProductModel.find({ _id: { $in: productIds } });

    // Gabungkan data produk dan info cart
    const cartItems = products.map((product) => ({
      ...product.toObject(),
      quantity: cart[product._id].quantity,
      size: cart[product._id].size,
      productId: product._id,
    }));

    res.status(200).json({ cartItems });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { quantity, size } = req.body;

    const user = await UserModel.findById(userId);

    if (!user.cartData[productId]) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    user.cartData[productId] = {
      ...user.cartData[productId],
      quantity: quantity ?? user.cartData[productId].quantity,
      size: size ?? user.cartData[productId].size,
    };

    await user.save();

    res.json({ message: 'Cart item updated successfully', cartData: user.cartData });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await UserModel.findById(req.user.id);

    if (!user.cartData[productId]) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    delete user.cartData[productId];
    user.markModified('cartData');
    await user.save();

    res.status(200).json({
      message: 'Cart item deleted successfully',
      cartData: user.cartData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { addCart, getCart, updateCart, deleteCart };
