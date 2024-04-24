const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const paymentController = require('../controllers/payment-controller')

router.post('/createPayment', authenticate, paymentController.createPayment)
router.get('/getPaymentDetails/:paymentId', authenticate, paymentController.getPaymentDetails)
router.put('/updatePayment/:paymentId', authenticate, paymentController.updatePayment)
router.delete('/deletePayment/:paymentId', authenticate, paymentController.deletePayment)
router.get('/getAllPayment', authenticate, paymentController.getAllPayment)
router.get('/getUserPayments', authenticate, paymentController.getUserPayments)

module.exports = router