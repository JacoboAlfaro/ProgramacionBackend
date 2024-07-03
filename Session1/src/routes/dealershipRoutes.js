const express = require('express')
const dealershipController = require('../controllers/DealershipController')
const authenticatedToken = require("../middlewares/authMiddleware")

const router = express.Router()

router.post('/new-dealership',authenticatedToken, dealershipController.createDealershhip)
router.get('/', dealershipController.getDealerships)
router.get('/:id', dealershipController.getDealershipById)
router.patch('/edit/:id', authenticatedToken, dealershipController.updateDealershipById)
router.delete('/remove/:id', authenticatedToken, dealershipController.deleteDealershipById)

module.exports = router;
