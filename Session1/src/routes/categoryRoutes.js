const express = require('express')
const categoryController = require('../controllers/CategoryController')
const authenticatedToken = require("../middlewares/authMiddleware")
const router = express.Router();

router.post('/', authenticatedToken, categoryController.createCategory)
router.get('/', authenticatedToken, categoryController.getCategories)
router.get('/:id', authenticatedToken, categoryController.getCategoryById)
router.patch('/:id', authenticatedToken, categoryController.updateCategory)
router.delete('/:id', authenticatedToken, categoryController.deleteCategoryById)

module.exports = router