const express = require('express')
const superheroController = require('../controllers/SuperheroController')
const authenticatedToken = require("../middlewares/authMiddleware")

const router = express.Router()

router.post('/new-superhero', authenticatedToken, superheroController.createSuperhero)
router.get('/', superheroController.getSuperheroes)
router.get('/:id', superheroController.getSuperheroById)
router.patch('/edit/:id',authenticatedToken, superheroController.updateSuperheroById)
router.delete('/remove/:id', authenticatedToken, superheroController.deleteSuperheroById)

module.exports = router;
