const express = require('express')
const superheroController = require('../controllers/SuperheroController')
const authenticatedToken = require("../middlewares/authMiddleware")

const router = express.Router()

router.post('/', superheroController.createSuperhero)
router.get('/', superheroController.getSuperheroes)
router.get('/:id', superheroController.getSuperheroById)
router.patch('/:id',authenticatedToken, superheroController.updateSuperheroById)
router.delete('/:id', authenticatedToken, superheroController.deleteSuperheroById)

module.exports = router;
