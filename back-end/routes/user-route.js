const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const userController = require('../controllers/user-controller')

router.get('/showuser', authenticate, userController.getAllUsers)
router.put('/:id', authenticate, userController.updateUser)
router.delete('/:id', authenticate, userController.deleteUser)

module.exports = router