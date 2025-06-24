const express = require('express');
const { addProduct, removeProduct, listProduct, singleProduct } = require('../controllers/ProductController.js');
const upload = require('../middleware/multer.js');

const router = express.Router();

router.post('/add', upload.fields([{name: 'image1', maxCount:1}, {name: 'image2', maxCount:1}, {name: 'image3', maxCount:1}, {name: 'image4', maxCount:1}]), addProduct);
router.post('/remove/:id', removeProduct);
router.post('/single', singleProduct);
router.get('/list', listProduct);

module.exports = router;
