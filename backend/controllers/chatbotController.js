const { Pool } = require('pg');
const OpenAI = require('openai');
const generarPromptPersonalizado = require('../promptPersonalizado');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let historial_conversacion = [];

// Función principal del chatbot
const chatbot = async (req, res) => {
  const { input, user_id } = req.body;

  console.log("Input del usuario:", input);

  if (!input || input.trim() === '') {
    return res.status(400).json({ message: 'El mensaje está vacío' });
  }

  try {
    // Extraer datos de la última sesión de cuestionarios
    const puntuacion_respuestas_data = await pool.query(
      "SELECT puntuacion_respuesta FROM respuestas_cribado INNER JOIN cribado_sesiones ON respuestas_cribado.id_sesion = cribado_sesiones.id_sesion WHERE cribado_sesiones.id_usuario = $1 ORDER BY cribado_sesiones.fecha DESC LIMIT 3",
      [user_id]
    );
    const puntuacion_respuestas = puntuacion_respuestas_data.rows.map(row => row.puntuacion_respuesta);

    const puntuacion_gravedad_data = await pool.query(
      "SELECT puntuacion_gravedad FROM cribado_sesiones WHERE id_usuario = $1 ORDER BY fecha DESC LIMIT 1",
      [user_id]
    );
    const puntuacion_gravedad = puntuacion_gravedad_data.rows[0]?.puntuacion_gravedad || null;

    // Extraer resúmenes de conversaciones previas
    const historial_conversaciones = await pool.query(
      "SELECT fecha, resumen FROM conversacion WHERE id_usuario = $1 ORDER BY fecha DESC",
      [user_id]
    );
    const conversaciones_previas = historial_conversaciones.rows.map(row => ({
      fecha: row.fecha,
      resumen: row.resumen,
    }));

    // Generar el prompt personalizado
    const promptPersonalizado = generarPromptPersonalizado(puntuacion_respuestas, puntuacion_gravedad, conversaciones_previas);

    historial_conversacion.push({ role: "user", content: input });

    const mensajes = [
      { role: "system", content: promptPersonalizado },
      ...historial_conversacion,
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: mensajes,
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      user: user_id,
    });

    const respuesta = response.choices[0].message.content;
    historial_conversacion.push({ role: "assistant", content: respuesta });

    const tiposAnsiedadDetectados = extraerTipoAnsiedad(respuesta);

    if (tiposAnsiedadDetectados.length > 0) {
      await insertarTiposAnsiedad(user_id, tiposAnsiedadDetectados);
      res.json({
        respuesta,
        tipos_ansiedad: tiposAnsiedadDetectados,
      });
    } else {
      res.json({
        respuesta,
        tipos_ansiedad: [],
      });
    }
  } catch (error) {
    console.error('Error al conectar con la API:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Función para guardar el resumen de la conversación
const guardarResumen = async (req, res) => {
  const { user_id, historial } = req.body;

  if (!user_id || !historial || historial.length === 0) {
    return res.status(400).json({ message: 'Datos insuficientes para guardar el resumen' });
  }

  try {
    const mensajesUsuario = historial.filter(msg => msg.quien === "usuario").map(msg => msg.texto).join(" ");
    const promptResumen = `A partir de la siguiente conversación, genera un resumen de los síntomas mencionados por el usuario. 
    Hazlo en un tono que luego se le pueda presentar al usuario en su perfil hablando directamente en segunda persona al usuario, contándoselo de forma sensible.
    No le preguntes cómo está ni nada similar, solo cuéntale el resumen de su situación. Ejemplo: "Mencionaste que te sientes ansioso y que a veces tienes ataques de pánico. También mencionaste que evitas situaciones sociales porque te sientes incómodo en ellas".
    Mensajes que ha mandado el usuario: ${mensajesUsuario}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: "system", content: promptResumen }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const resumenSintomas = response.choices[0].message.content;

    await pool.query(
      "INSERT INTO conversacion (id_usuario, resumen) VALUES ($1, $2)",
      [user_id, resumenSintomas]
    );

    res.json({ message: "Resumen guardado correctamente", resumen: resumenSintomas });
  } catch (error) {
    console.error("Error al guardar el resumen:", error);
    res.status(500).json({ message: "Error al guardar el resumen" });
  }
};

// Función auxiliar para extraer tipos de ansiedad
function extraerTipoAnsiedad(respuesta) {
  const tipos = [
    { nombre: "Trastorno de ansiedad generalizada", patrones: [/ansiedad generalizada/i, /trastorno de ansiedad generalizada/i] },
    { nombre: "Fobia social (trastorno de ansiedad social)", patrones: [/ansiedad social/i, /fobia social/i] },
    { nombre: "Fobia específica", patrones: [/fobia específica/i] },
    { nombre: "Trastorno de pánico", patrones: [/trastorno de pánico/i] },
    { nombre: "Agorafobia", patrones: [/agorafobia/i] },
    { nombre: "Trastorno de ansiedad inducido por sustancias", patrones: [/inducido por sustancias/i] },
    { nombre: "Trastorno de ansiedad por otra afeción médica", patrones: [/afección médica/i, /por una condición médica/i] },
  ];

  const tiposDetectados = [];

  for (const tipo of tipos) {
    for (const patron of tipo.patrones) {
      if (patron.test(respuesta)) {
        tiposDetectados.push(tipo.nombre);
        break;
      }
    }
  }

  return tiposDetectados;
}

// Función auxiliar para insertar tipos de ansiedad detectados
async function insertarTiposAnsiedad(user_id, tiposAnsiedadDetectados) {
  for (const tipo of tiposAnsiedadDetectados) {
    const idTipoAnsiedad = await pool.query(
      "SELECT id_ansiedad FROM tipo_ansiedad WHERE nombre = $1",
      [tipo]
    );
    const idAnsiedad = idTipoAnsiedad.rows[0].id_ansiedad;
    await pool.query(
      "INSERT INTO deteccion (id_usuario, id_ansiedad) VALUES ($1, $2)",
      [user_id, idAnsiedad]
    );
  }
}

module.exports = {
  chatbot,
  guardarResumen,
};