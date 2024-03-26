const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const cartController = require('../controllers/cart-controller')

router.post('/addProductToCard/:id', authenticate, cartController.addProductToCard)
router.get('/getCart', authenticate, cartController.getCart)
router.put('/updateCart/:id', authenticate, cartController.updateCart)
router.delete('/deleteCart/:id', authenticate, cartController.deleteCart)


module.exports = router