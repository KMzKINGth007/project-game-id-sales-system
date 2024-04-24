const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const productController = require('../controllers/product-controller')

router.get('/', authenticate, productController.getProducts)
router.post('/addProducts', authenticate, productController.createProduct)
router.put('/:id', authenticate, productController.updateProduct)
router.delete('/:id', authenticate, productController.deleteProduct)
router.get('/:id', authenticate, productController.getProductById)
router.get('/gameType/:gameTypeId', authenticate, productController.getProductsByGameType)

module.exports = router