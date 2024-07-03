const express = require('express')
const authorController = require('../controllers/AuthorController')
const router = express.Router()

router.post('/new-author', authorController.createAuthor)
router.get('/', authorController.getAuthor)
router.patch('/edit-author/:id', authorController.updateAuthor)
router.delete('/delete-author/:id', authorController.deleteAuthor)

module.exports = router