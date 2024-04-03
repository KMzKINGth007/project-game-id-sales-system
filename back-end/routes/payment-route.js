const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const paymentController = require('../controllers/payment-controller')

router.post('/createPayment', authenticate, paymentController.createPayment)
router.get('/getPaymentDetails/:paymentId', authenticate, paymentController.getPaymentDetails)

module.exports = router