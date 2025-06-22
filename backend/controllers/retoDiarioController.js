const pool = require('../db/pool');

// Obtener un reto diario no completado
const obtenerRetoDiario = async (req, res) => {
  const userId = req.query.userId;

  let tiposAnsiedad = req.query.tipos_ansiedad_detectados;
  if (typeof tiposAnsiedad === 'string') {
    try {
      tiposAnsiedad = JSON.parse(tiposAnsiedad);
    } catch {
      tiposAnsiedad = [];
    }
  }
  if (!Array.isArray(tiposAnsiedad)) {
    tiposAnsiedad = [];
  }
  const idsAnsiedadUnicos = tiposAnsiedad.length > 0
    ? [...new Set(tiposAnsiedad.map(item => item.id_ansiedad))]
    : [0]; // Si no hay tipos, solo retos generales

  console.log('idsAnsiedadUnicos:', idsAnsiedadUnicos);

  try {
    const diaActual = new Date().toISOString().split('T')[0];

    const retoAsignadoHoy = await pool.query(
      `SELECT retos.*, usuarios_retocompletado.*, tipo_ansiedad.nombre
       FROM retos 
       INNER JOIN tipo_ansiedad ON retos.id_ansiedad = tipo_ansiedad.id_ansiedad
       INNER JOIN usuarios_retocompletado ON retos.id_reto = usuarios_retocompletado.id_reto
       WHERE usuarios_retocompletado.id_usuario = $1 
       AND usuarios_retocompletado.fecha::date = $2`,
      [userId, diaActual]
    );

    if (retoAsignadoHoy.rows.length > 0) {
      const reto = retoAsignadoHoy.rows[0];
      return res.json({
        reto: {
          ...reto,
          completado: reto.completado,
        },
        mensaje: "Reto ya asignado anteriormente para hoy",
      });
    }

    const obtenerRetoAleatorioDiario = await pool.query(
      `SELECT * FROM retos 
       WHERE activo = true
       AND (id_ansiedad = 0 OR id_ansiedad = ANY($3))
       AND id_reto NOT IN (SELECT id_reto FROM usuarios_retocompletado WHERE id_usuario = $1 AND fecha::date = $2)
       ORDER BY random()
       LIMIT 1`,
      [userId, diaActual, idsAnsiedadUnicos]
    );

    if (obtenerRetoAleatorioDiario.rows.length === 0) {
      return res.json({
        reto: null,
        mensaje: "El usuario ha completado hoy todos los retos",
      });
    }

    const nuevoRetoDelDia = obtenerRetoAleatorioDiario.rows[0];
    await pool.query(
      "INSERT INTO usuarios_retocompletado (id_usuario, id_reto, fecha, completado) VALUES ($1, $2, $3, false)",
      [userId, nuevoRetoDelDia.id_reto, diaActual]
    );

    res.json({
      reto: nuevoRetoDelDia,
      mensaje: "Nuevo reto asignado para el día de hoy",
    });
  } catch (error) {
    console.error("Error al obtener el reto diario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Obtener la racha del usuario
const obtenerRacha = async (req, res) => {
  const userId = req.query.userId;

  try {
    const queryMejorRachaHistorica = await pool.query(
      `WITH fechas_distintas AS (
        SELECT DISTINCT fecha::date
        FROM usuarios_retocompletado
        WHERE id_usuario = $1 AND completado = true
      ),
      fechas_con_rn AS (
        SELECT
          fecha,
          ROW_NUMBER() OVER (ORDER BY fecha) AS rn
        FROM fechas_distintas
      ),
      grupos AS (
        SELECT
          fecha,
          fecha - (rn || ' days')::interval AS grupo
        FROM fechas_con_rn
      ),
      rachas AS (
        SELECT
          grupo,
          COUNT(*) AS dias
        FROM grupos
        GROUP BY grupo
      )
      SELECT MAX(dias) AS mejor_racha
      FROM rachas;`,
      [userId]
    );

    const queryRachaHastaDiaAnterior = await pool.query(
      `WITH fechas_distintas AS (
        SELECT DISTINCT fecha::date
        FROM usuarios_retocompletado
        WHERE id_usuario = $1 AND completado = true
      ),
      ayer_completado AS (
        SELECT 1
        FROM fechas_distintas
        WHERE fecha = CURRENT_DATE - INTERVAL '1 day'
      ),
      fechas_con_rn AS (
        SELECT
          fecha,
          ROW_NUMBER() OVER (ORDER BY fecha) AS rn
        FROM fechas_distintas
        WHERE fecha <= CURRENT_DATE - INTERVAL '1 day'
      ),
      grupos AS (
        SELECT
          fecha,
          fecha - (rn || ' days')::interval AS grupo
        FROM fechas_con_rn
      ),
      racha_actual AS (
        SELECT
          grupo,
          COUNT(*) AS dias
        FROM grupos
        GROUP BY grupo
        ORDER BY grupo DESC
        LIMIT 1
      )
      SELECT
        CASE
          WHEN EXISTS (SELECT 1 FROM ayer_completado)
          THEN (SELECT dias FROM racha_actual)
          ELSE 0
        END AS racha_actual;`,
      [userId]
    );

    const mejorRacha = queryMejorRachaHistorica.rows[0]?.mejor_racha || 0;
    const rachaHastaDiaAnterior = queryRachaHastaDiaAnterior.rows[0]?.racha_actual || 0;
    const racha = {
      mejor_racha: mejorRacha,
      racha_actual: rachaHastaDiaAnterior,
    };
    res.json({ racha });
  } catch (error) {
    console.error("Error al obtener la racha:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Completar un reto diario
const completarRetoDiario = async (req, res) => {
  const { idUsuarioReto } = req.body;

  try {
    await pool.query(
      "UPDATE usuarios_retocompletado SET completado = true WHERE id_usuario_reto = $1",
      [idUsuarioReto]
    );
    res.json({ message: "Reto completado correctamente" });
  } catch (error) {
    console.error("Error al completar el reto diario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  obtenerRetoDiario,
  obtenerRacha,
  completarRetoDiario,
};