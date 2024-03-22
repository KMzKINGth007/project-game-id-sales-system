const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const cartController = require('../controllers/cart-controller')

router.post('/addProductToCard/:id', authenticate, cartController.addProductToCard)


module.exports = router