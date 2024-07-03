const express = require('express')
const sessionController = require('../controllers/SessionController')
const router = express.Router()

router.post('/new-session', sessionController.createSession);
// router.post('/get-session', sessionController.getSession); // Para utilizar el método get session comentado en Session Controller
router.get('/get-session', sessionController.getSession);
router.get('/get-session/:token', sessionController.getSessionByToken);

module.exports = router
