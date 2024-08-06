const express = require('express')
const userController = require('../controllers/UserController')
const authenticatedToken = require("../middlewares/authMiddleware")
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/users')
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    },
});

const upload = multer({storage: storage})

router.post('/', authenticatedToken, upload.single('avatar'),userController.createUser)
router.get('/', userController.getUsers)
router.get('/:id', userController.getUserById)
router.patch('/:id', authenticatedToken, upload.single('avatar'), userController.updateUserById)
router.delete('/:id',authenticatedToken,  userController.deleteUserById)


module.exports = router;