const express = require('express');
const { addProduct, removeProduct, listProduct, singleProduct, relatedProduct } = require('../controllers/ProductController.js');
const upload = require('../middleware/multer.js');
const auth = require('../auth/authMiddleware.js');

const router = express.Router();

router.post(
  '/add',
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  addProduct
);
router.delete('/products/:id', auth, removeProduct);
router.get('/single/:id', singleProduct);
router.get('/list', listProduct);
router.get('/products', relatedProduct);

module.exports = router;
