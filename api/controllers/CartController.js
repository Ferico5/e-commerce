const UserModel = require('../models/UserModel.js');
const ProductModel = require('../models/ProductModel.js');

const addCart = async (req, res) => {
  const { productId, quantity, size } = req.body;
  const userId = req.user.id;

  try {
    const user = await UserModel.findById(userId);

    if (!user.cartData) user.cartData = [];

    // Cek apakah item sudah ada dengan id dan size yang sama
    const existingItem = user.cartData.find((item) => item.productId.toString() === productId && item.size === size);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cartData.push({ productId, quantity, size });
    }

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
    const cart = user.cartData || [];

    const productIds = cart.map((item) => item.productId);
    const products = await ProductModel.find({ _id: { $in: productIds } });

    const cartItems = cart.map((item) => {
      const product = products.find((prod) => prod._id.toString() === item.productId.toString());

      return {
        ...product.toObject(),
        quantity: item.quantity,
        size: item.size,
        productId: item.productId,
      };
    });

    res.status(200).json({ cartItems });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

const updateCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const { quantity, size } = req.body;

  try {
    const user = await UserModel.findById(userId);

    const cartItem = user.cartData.find((item) => item.productId.toString() === productId && item.size === size);

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity !== undefined) cartItem.quantity = quantity;
    if (size !== undefined) cartItem.size = size;

    await user.save();

    res.json({ message: 'Cart item updated successfully', cartData: user.cartData });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

const deleteCart = async (req, res) => {
  const { productId } = req.params;
  const { size } = req.query;

  try {
    const user = await UserModel.findById(req.user.id);

    user.cartData = user.cartData.filter((item) => !(item.productId.toString() === productId && (!size || item.size === size)));

    await user.save();

    res.status(200).json({
      message: 'Cart item deleted successfully',
      cartData: user.cartData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { addCart, getCart, updateCart, deleteCart };
