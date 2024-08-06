const express = require('express')
const postController = require('../controllers/postController')
const authenticatedToken = require("../middlewares/authMiddleware")
const router = express.Router();
//Post routes
router.post('/', authenticatedToken, postController.createPost)
router.get('/', authenticatedToken, postController.getPosts)
router.get('/:id', authenticatedToken, postController.getPostById)

module.exports = router