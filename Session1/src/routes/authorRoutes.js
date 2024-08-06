const express = require('express')
const authorController = require('../controllers/AuthorController')
const authenticatedToken = require("../middlewares/authMiddleware")
const router = express.Router();

//Author routes
router.post('/', authenticatedToken, authorController.createAuthor)
router.get('/', authenticatedToken, authorController.getAuthors)
router.get('/', authenticatedToken, authorController.getAuthorWithPosts)
router.delete('/:id', authenticatedToken,authorController.deleteAuthor)
router.patch('/:id', authenticatedToken,authorController.updateAuthor)

module.exports = router
