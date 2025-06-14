const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(encrypted) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Obtener datos del usuario
const obtenerUsuario = async (req, res) => {
  const { userId } = req.query;  

  try {
    const usuarioQuery = await pool.query(
      "SELECT nombre, fechanacimiento, genero, email, foto_perfil FROM usuarios WHERE id = $1",
      [userId]
    );
    let usuario = usuarioQuery.rows[0];

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    usuario = {
      ...usuario,
      nombre: decrypt(usuario.nombre),
      fechanacimiento: usuario.fechanacimiento, 
      genero: decrypt(usuario.genero),
      email: decrypt(usuario.email),
    };

    const cribadoQuery = await pool.query(
      "SELECT fecha, puntuacion_gravedad FROM (SELECT fecha, puntuacion_gravedad FROM cribado_sesiones WHERE id_usuario = $1 ORDER BY fecha DESC LIMIT 10) AS subquery ORDER BY fecha ASC",
      [userId]
    );
    const puntuaciones_gravedad = cribadoQuery.rows.map(row => ({
      fecha: row.fecha,
      puntuacion_gravedad: row.puntuacion_gravedad,
    }));

    const alerta_gravedad_severa = puntuaciones_gravedad[puntuaciones_gravedad.length - 1]?.puntuacion_gravedad >= 28;

    const historial_conversaciones = await pool.query(
      "SELECT fecha, resumen FROM conversacion WHERE id_usuario = $1 ORDER BY fecha DESC",
      [userId]
    );
    const resumenes_chatbot = historial_conversaciones.rows.map(row => ({
      fecha: row.fecha,
      resumen: row.resumen,
    }));

    const detecciones_ansiedad = await pool.query(
      "SELECT deteccion.id_ansiedad, tipo_ansiedad.nombre, tipo_ansiedad.informacion, deteccion.fecha FROM deteccion INNER JOIN tipo_ansiedad ON deteccion.id_ansiedad = tipo_ansiedad.id_ansiedad WHERE id_usuario = $1",
      [userId]
    );
    const tipos_ansiedad_detectados = detecciones_ansiedad.rows.map(row => ({
      nombre: row.nombre,
      informacion: row.informacion,
      fecha: row.fecha,
      id_ansiedad: row.id_ansiedad,
    }));

    return res.json({
      usuario,
      puntuaciones_gravedad,
      alerta_gravedad_severa,
      resumenes_chatbot,
      tipos_ansiedad_detectados,
    });
  } catch (err) {
    console.error("Error al obtener los datos del usuario:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Configuración de multer para subir imágenes
const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.user_id}_${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: almacenamiento });

// Actualizar datos del usuario
const actualizarUsuario = async (req, res) => {
  const { nombre, fechanacimiento, genero, email } = req.body;
  const userId = req.body.user_id;
  const fotoPerfil = req.file ? `/uploads/${req.file.filename}` : null;

  try {

    const nombreCifrado = encrypt(nombre);
    const generoCifrado = encrypt(genero);
    const emailCifrado = encrypt(email);

    const result = await pool.query(
      "UPDATE usuarios SET nombre = $1, fechanacimiento = $2, genero = $3, email = $4, foto_perfil = $5 WHERE id = $6",
      [nombreCifrado, fechanacimiento, generoCifrado, emailCifrado, fotoPerfil, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Datos actualizados correctamente", fotoPerfil });
  } catch (err) {
    console.error("Error al actualizar los datos del usuario:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  obtenerUsuario,
  actualizarUsuario,
  upload,
};