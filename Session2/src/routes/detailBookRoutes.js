const express = require('express')
const detailBookController = require('../controllers/detailBookController')
const router = express.Router()

router.post('/new-book', detailBookController.createBookWithDetail)
router.get('/', detailBookController.getBookWithDetail)
router.get('/details/', detailBookController.getDetails)
router.patch('/edit-book/:id', detailBookController.updateBookDetail)
router.delete('/delete-book/:id', detailBookController.deleteBookDetail)


module.exports = router