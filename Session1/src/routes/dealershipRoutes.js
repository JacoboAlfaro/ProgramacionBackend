const express = require('express')
const dealershipController = require('../controllers/DealershipController')
const authenticatedToken = require("../middlewares/authMiddleware")

const router = express.Router()

router.post('/', dealershipController.createDealershhip)
router.get('/', dealershipController.getDealerships)
router.get('/:id', dealershipController.getDealershipById)
router.patch('/:id', authenticatedToken, dealershipController.updateDealershipById)
router.delete('/:id', authenticatedToken, dealershipController.deleteDealershipById)

module.exports = router;
