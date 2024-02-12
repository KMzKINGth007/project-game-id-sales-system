// back-end/routes/product-route.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const productController = require('../controllers/product-controller');

router.post('/', authenticate, productController.createProduct);

module.exports = router;
