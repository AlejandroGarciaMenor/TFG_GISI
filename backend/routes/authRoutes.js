const express = require('express');
const {
  register,
  login,
  verificarCodigo2FA,
} = require('../controllers/authController');

const router = express.Router();

// Rutas de autenticación
router.post('/register', register);
router.post('/login', login);

// Rutas de 2FA
router.post('/verificar-2fa', verificarCodigo2FA);

module.exports = router;