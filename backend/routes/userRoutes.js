const express = require('express');
const { obtenerUsuario, actualizarUsuario, upload } = require('../controllers/userController');
const verificarToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas protegidas con JWT
router.get('/usuario', verificarToken, obtenerUsuario);
router.put('/usuario', verificarToken, upload.single("fotoPerfil"), actualizarUsuario);

module.exports = router;