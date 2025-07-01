const ProductModel = require('../models/ProductModel.js');
const cloudinary = require('../config/cloudinary.js');

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === 'true' ? true : false,
      image: imagesUrl,
    };

    const product = new ProductModel(productData);
    await product.save();

    res.status(201).json({ msg: 'Product added!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

const removeProduct = async (req, res) => {
  try {
    const removeProduct = await ProductModel.findByIdAndDelete(req.params.id);

    if (!removeProduct) {
      return res.status(404).json({ msg: 'Product not found!' });
    }

    res.status(200).json({ msg: 'Product removed!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

const listProduct = async (req, res) => {
  try {
    const listProduct = await ProductModel.find();
    res.status(200).json({ msg: 'Successful getting list products', listProduct });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

const singleProduct = async (req, res) => {
  try {
    const singleProduct = await ProductModel.findById(req.params.id);

    if (!singleProduct) {
      return res.status(404).json({ msg: 'Product not found!' });
    }

    res.status(200).json({ msg: 'Successful getting product', singleProduct });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { addProduct, removeProduct, listProduct, singleProduct };
