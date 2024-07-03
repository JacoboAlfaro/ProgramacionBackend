const express = require('express')
const categoryController = require('../controllers/CategoryController')
const router = express.Router();

router.post('/new-category', categoryController.createCategory)
router.get('/', categoryController.getCategories)
router.get('/:id', categoryController.getCategoryById)
router.patch('/update-category/:id', categoryController.updateCategory)
router.delete('/delete-category/:id', categoryController.deleteCategoryById)

module.exports = router