const express = require('express');
const {
  obtenerRetoDiario,
  obtenerRacha,
  completarRetoDiario,
} = require('../controllers/retoDiarioController');
const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas protegidas con JWT
router.get('/obtener-reto-diario', verificarToken, obtenerRetoDiario);
router.get('/racha', verificarToken, obtenerRacha);
router.post('/completar-reto-diario', verificarToken, completarRetoDiario);

module.exports = router;