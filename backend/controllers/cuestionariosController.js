const pool = require('../db/pool');

// Iniciar sesión de cribado
const iniciarSesionCribado = async (req, res) => {
  const { userId } = req.body;

  try {
    const ultimaSesion = await pool.query(
      "SELECT id_sesion FROM cribado_sesiones WHERE id_usuario = $1 AND fecha > NOW() - INTERVAL '2 s' ORDER BY fecha DESC LIMIT 1",
      [userId]
    );

    if (ultimaSesion.rows.length > 0) {
      const idSesionExistente = ultimaSesion.rows[0].id_sesion;
      console.log("Intento de crear una sesión duplicada:", idSesionExistente);
      return res.status(200).json({ idSesion: idSesionExistente });
    }

    const nuevaSesion = await pool.query(
      "INSERT INTO cribado_sesiones (id_usuario) VALUES ($1) RETURNING id_sesion",
      [userId]
    );

    const idSesionNueva = nuevaSesion.rows[0].id_sesion;
    console.log("Nueva Sesión de cribado iniciada:", idSesionNueva);
    res.status(200).json({ idSesionNueva });
  } catch (err) {
    console.error("Error al iniciar la sesión de cribado:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Guardar respuestas del cribado
const guardarRespuestas = async (req, res) => {
  const { idSesion, respuestas } = req.body;

  try {
    for (const pregunta in respuestas) {
      await pool.query(
        "INSERT INTO respuestas_cribado (id_sesion, numero_pregunta, puntuacion_respuesta) VALUES ($1, $2, $3)",
        [idSesion, pregunta, respuestas[pregunta]]
      );
    }

    res.status(200).json({ message: "Respuestas guardadas correctamente" });
  } catch (err) {
    console.error("Error al guardar las respuestas:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Guardar gravedad del cribado
const guardarGravedad = async (req, res) => {
  const { user_id, puntuacion_gravedad } = req.body;

  try {
    const idUltimaSesion = await pool.query(
      "SELECT id_sesion FROM cribado_sesiones WHERE id_usuario = $1 ORDER BY fecha DESC LIMIT 1",
      [user_id]
    );

    if (idUltimaSesion.rows.length === 0) {
      return res.status(404).json({ message: "No se encontró ninguna sesión para este usuario" });
    }

    const idSesion = idUltimaSesion.rows[0].id_sesion;

    await pool.query(
      "UPDATE cribado_sesiones SET puntuacion_gravedad = $1 WHERE id_sesion = $2",
      [puntuacion_gravedad, idSesion]
    );

    res.status(200).json({ message: "Gravedad guardada correctamente" });
  } catch (err) {
    console.error("Error al guardar la gravedad:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  iniciarSesionCribado,
  guardarRespuestas,
  guardarGravedad,
};