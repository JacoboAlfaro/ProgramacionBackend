const express = require('express')
const authController = require('../controllers/AuthController')
const router = express.Router()

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/reset-password', authController.requestPasswordReset);
router.post('/request-password/:token', authController.resetPassword)

module.exports = router;