const express = require('express')
const postController = require('../controllers/postController')
const router = express.Router();

//Author routes
router.post('/new-author', postController.createAuthor)
router.get('/', postController.getAuthors)
router.get('/author-posts', postController.getAuthorWithPosts)
router.delete('/remove-author/:id', postController.deleteAuthor)
router.patch('/update-author/:id', postController.updateAuthor)

//Post routes
router.post('/new-post', postController.createPost)
router.get('/all-posts/', postController.getPosts)
router.get('/all-posts/:id', postController.getPostById)

module.exports = router