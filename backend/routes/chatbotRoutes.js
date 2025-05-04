const express = require('express');
const { chatbot, guardarResumen } = require('../controllers/chatbotController');
const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas protegidas con JWT
router.post('/chatbot-conversacion', verificarToken, chatbot);
router.post('/guardar-resumen', verificarToken, guardarResumen);

module.exports = router;