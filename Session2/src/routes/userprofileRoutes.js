const express = require('express')
const userProfileController = require('../controllers/userProfileController')
const router = express.Router()

router.post('/new-user', userProfileController.createUserWithProfile)
router.get('/:email', userProfileController.getUserWithProfile)

module.exports = router