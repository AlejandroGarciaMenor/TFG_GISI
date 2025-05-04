const express = require('express');
const {
  iniciarSesionCribado,
  guardarRespuestas,
  guardarGravedad,
} = require('../controllers/cuestionariosController');
const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas protegidas con JWT
router.post('/iniciar-sesion-cribado', verificarToken, iniciarSesionCribado);
router.post('/guardar-respuestas', verificarToken, guardarRespuestas);
router.post('/guardar-gravedad', verificarToken, guardarGravedad);

module.exports = router;