require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const axios = require('axios');
// const { HfInference } = require("@huggingface/inference");
const OpenAI = require('openai');



// certificado
const fs = require('fs');
const https = require('https');

const options = {
  key: fs.readFileSync('../ssl/localhost-key.pem'),
  cert: fs.readFileSync('../ssl/localhost.pem'),
};

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// conexion bbdd
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// configuracion servcio de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ruta incicio
app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});

// función para validar contraseña
const validarPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$_!%*?&])[A-Za-z\d@$!%*?&_]{8,}$/;
  return regex.test(password);
};

// ruta registro
app.post("/register", async (req, res) => {
  const { nombre, fechanacimiento, genero, email, password } = req.body;

  if (!validarPassword(password)) {
    return res.status(400).json({ message: "La contraseña debe estar formada por al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial" });
  }

  try {
    const existingUser = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO usuarios (nombre, fechanacimiento, genero, email, password) VALUES ($1, $2, $3, $4, $5)', [nombre, fechanacimiento, genero, email, hashedPassword]
    );

    res.json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    console.error("Error en el registro:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// ruta login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).send("Usuario no encontrado");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Contraseña incorrecta");
    }

    // si 2FA esta activado
    if(user.two_factor_activado) {
      const codigo = crypto.randomInt(100000, 999999).toString();
      const expiracion =  new Date(Date.now() + 5 * 60 * 1000);

      await pool.query("UPDATE usuarios SET two_factor_codigo = $1, two_factor_expiracion = $2 WHERE id = $3", [codigo, expiracion, user.id]);

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Código de verificación",
        text: `EL código de verificación es: ${codigo}`,
      });

      return res.json({ message: "Código de verificación enviado" });
    }
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, nombre: user.nombre, id: user.id });
      
  } catch (err) {
    console.error(err);
    res.status(500).send("Error en el servidor");
  }
});

// ruta verificar doble factor
app.post("/verificar-2fa", async (req, res) => {
  const { email, codigo } = req.body;

  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).send("Usuario no encontrado");
    }

    if (user.two_factor_codigo !== codigo) {
      return res.status(400).send("Código incorrecto");
    }

    if (new Date() > user.two_factor_expiracion) {
      return res.status(400).send("Código expirado");
    }

    // si el codigo es correcto
    await pool.query("UPDATE usuarios SET two_factor_codigo = null, two_factor_expiracion = null WHERE id = $1", [user.id]);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, nombre: user.nombre, id: user.id });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error en el servidor");
  }
});

// ruta iniciar sesion cribado
app.post("/iniciar-sesion-cribado", async (req, res) => {
  const { userId } = req.body;

  try {
    const ultimaSesion = await pool.query(
      "SELECT id_sesion FROM cribado_sesiones WHERE id_usuario = $1 AND fecha > NOW() - INTERVAL '2 s' ORDER BY fecha DESC LIMIT 1",
      [userId]
    );

    if (ultimaSesion.rows.length > 0) {
      const idSesionExistente = ultimaSesion.rows[0].id_sesion;
      console.log("Intento de crear una sesión duplicada:", idSesionExistente);
      return res.status(200).json({ idSesion: idSesionExistente });º
    }

    const nueva_sesion = await pool.query(
      "INSERT INTO cribado_sesiones (id_usuario) VALUES ($1) RETURNING id_sesion",
      [userId]
    );

    const idSesionNueva = nueva_sesion.rows[0].id_sesion;
    console.log("Nueva Sesión de cribado iniciada:", idSesionNueva);
    res.status(200).json({ idSesionNueva });
  } catch (err) {
    console.error("Error al iniciar la sesión de cribado:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// ruta para guardar las respuestas
app.post("/guardar-respuestas", async (req, res) => {
  const { idSesion, respuestas } = req.body;

  try {
    for (const pregunta in respuestas) {
      console.log(pregunta, respuestas[pregunta]);
      console.log(Object.keys(respuestas).length);
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
});

// ruta para guardar la gravedad
app.post("/guardar-gravedad", async (req, res) => {
  const { user_id, puntuacion_gravedad } = req.body;
  console.log("ID de usuario:", user_id);
  console.log("Puntuación de gravedad:", puntuacion_gravedad);

  const id_ultima_sesion = await pool.query(
    "SELECT id_sesion FROM cribado_sesiones WHERE id_usuario = $1 ORDER BY fecha DESC LIMIT 1",
    [user_id]
  );

  if (id_ultima_sesion.rows.length === 0) {
    return res.status(404).json({ message: "No se encontró ninguna sesión para este usuario" });
  }

  const id_sesion = id_ultima_sesion.rows[0].id_sesion;
  console.log("ID de la última sesión:", id_sesion);

  try {
    await pool.query(
      "UPDATE cribado_sesiones SET puntuacion_gravedad = $1 WHERE id_sesion = $2",
      [puntuacion_gravedad, id_sesion]
    );

    res.status(200).json({ message: "Gravedad guardada correctamente" });
  } catch (err) {
    console.error("Error al guardar la gravedad:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// chatbot
const generarPromptPersonalizado = require('./promptPersonalizado');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

let historial_conversacion = [];

app.post("/chatbot", async (req, res) => {
  const { input, user_id } = req.body;

  console.log("ID de usuario:", user_id);

  if (!input || input.trim() === '') {
    return res.status(400).json({ message: 'El mensaje está vacío' });
  }

  try {

    // extraigo los datos de la última sesión de cuestionarios
    const puntuacion_respuestas_data = await pool.query(
      "select puntuacion_respuesta from respuestas_cribado inner join cribado_sesiones on respuestas_cribado.id_sesion = cribado_sesiones.id_sesion where cribado_sesiones.id_usuario = $1 order by cribado_sesiones.fecha DESC limit 3 ",
      [user_id]
    );
    const puntuacion_respuestas = puntuacion_respuestas_data.rows.map(row => row.puntuacion_respuesta);
    console.log("Puntuaciones de respuestas:", puntuacion_respuestas);

    const puntuacion_gravedad_data = await pool.query(
      "select puntuacion_gravedad from cribado_sesiones where id_usuario = $1 order by fecha DESC limit 1",
      [user_id]
    );
    const puntuacion_gravedad = puntuacion_gravedad_data.rows[0].puntuacion_gravedad;
    console.log("Puntuación de gravedad:", puntuacion_gravedad);

    // extraigo los resumenes de conversaciones previas entre chatbot y usuario
    const historial_conversaciones = await pool.query(
      "SELECT fecha, resumen FROM conversacion WHERE id_usuario = $1 ORDER BY fecha DESC",
      [user_id]
    );
    const conversaciones_previas = historial_conversaciones.rows.map(row => ({
      fecha: row.fecha,
      resumen: row.resumen,
    }));

    const promptPersonalizado = generarPromptPersonalizado(puntuacion_respuestas, puntuacion_gravedad, conversaciones_previas);
    console.log("Prompt personalizado:", promptPersonalizado);

    historial_conversacion.push({ role: "user", content: input });

    const mensajes = [
      {role: "system", content: promptPersonalizado},
      ...historial_conversacion
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: mensajes,
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      user: user_id
    });

    const respuesta = response.choices[0].message.content;
    historial_conversacion.push({ role: "assistant", content:respuesta });

    const tiposAnsiedadDetectados = extraerTipoAnsiedad(respuesta);
    console.log("Tipos de ansiedad detectados:", tiposAnsiedadDetectados);

    if (tiposAnsiedadDetectados.length > 0) {
      await insertarTiposAnsiedad(user_id, tiposAnsiedadDetectados);
      res.json({
        respuesta,
        tipos_ansiedad: tiposAnsiedadDetectados,    
      })
    } else {
      res.json({ 
        respuesta,
        tipos_ansiedad: []
      });
    }

  } catch (error) {
    console.error('Error al conectar con la API:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }

});

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

// ruta para guardar el resumen de la conversacion
app.post("/guardar-resumen", async (req, res) => {
  const { user_id, historial } = req.body;

  if (!user_id || !historial || historial.length === 0) {
    return res.status(400).json({ message: "Datos insuficientes para guardar el resumen" });
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
      max_tokens: 500
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
});

// ruta para obtener los datos del usuario
app.get("/usuario", async (req, res) => {
  const { userId } = req.query;

  const usuarioQuery = await pool.query(
    "SELECT nombre, fechanacimiento, genero, email FROM usuarios WHERE id = $1",
    [userId]
  );
  const usuario = usuarioQuery.rows[0];

  if (!usuario) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const cribadoQuery = await pool.query(
    "SELECT fecha, puntuacion_gravedad FROM (SELECT fecha, puntuacion_gravedad from cribado_sesiones where id_usuario = $1 order by fecha desc limit 10) as subquery ORDER BY fecha ASC",
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
    "SELECT deteccion.id_ansiedad, tipo_ansiedad.nombre, tipo_ansiedad.informacion, deteccion.fecha from deteccion inner join tipo_ansiedad on deteccion.id_ansiedad = tipo_ansiedad.id_ansiedad where id_usuario = $1",
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

});

// ruta para actualizar los datos del usuario
app.put("/usuario", async (req, res) => {
  const {nombre, fechanacimiento, genero, email} = req.body;
  const userId = req.body.user_id;

  try {
    const result = await pool.query(
      "UPDATE usuarios SET nombre = $1, fechanacimiento = $2, genero = $3, email = $4 WHERE id = $5",
      [nombre, fechanacimiento, genero, email, userId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ message: "Datos actualizados correctamente" });
  } catch (err) {
    console.error("Error al actualizar los datos del usuario:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }

});

// ruta para obtener un reto diario no completado
app.get("/reto-diario", async (req, res) => {
  const userId = req.query.userId;
  const tiposAnsiedad = req.query.tipos_ansiedad_detectados;
  console.log("Tipos de ansiedad detectados:", tiposAnsiedad);

  if (!Array.isArray(tiposAnsiedad) || tiposAnsiedad.length === 0) {
    return res.status(400).json({ message: "Tipos de ansiedad no válidos o no proporcionados" });
  }

  const idsAnsiedadUnicos = [...new Set(tiposAnsiedad.map(item => item.id_ansiedad))];

  try{
    const diaActual = new Date().toISOString().split('T')[0];

    const retoAsignadoHoy = await pool.query (
      `select retos.*, usuarios_retocompletado.*, tipo_ansiedad.nombre
      from retos 
      inner join tipo_ansiedad on retos.id_ansiedad = tipo_ansiedad.id_ansiedad
      inner join usuarios_retocompletado on retos.id_reto = usuarios_retocompletado.id_reto
      where usuarios_retocompletado.id_usuario = $1 
      and usuarios_retocompletado.fecha::date = $2`,
      [userId, diaActual]
    );

    if(retoAsignadoHoy.rows.length > 0){
      const reto = retoAsignadoHoy.rows[0];
      return res.json({
        reto: {
          ...reto,
          completado: reto.completado,
        },
        mensaje: "Reto ya asignado anteriormente para hoy"
      });
    }

    const obtenerRetoAleatorioDiario = await pool.query(
      `select * from retos 
       where activo = true
       and (id_ansiedad = 0 OR id_ansiedad = ANY($3))
       and id_reto not in (select id_reto from usuarios_retocompletado where id_usuario = $1 and fecha::date = $2)
       order by random()
       limit 1`,
      [userId, diaActual, idsAnsiedadUnicos]
    );

    if(obtenerRetoAleatorioDiario.rows.length === 0) {
      return res.json({
        reto: null, 
        mensaje: "El usuario ha completado hoy todos los retos"
      })
    }

    const nuevoRetoDelDia = obtenerRetoAleatorioDiario.rows[0];
    await pool.query(
      "insert into usuarios_retocompletado (id_usuario, id_reto, fecha, completado) VALUES ($1, $2, $3, false)",
      [userId, nuevoRetoDelDia.id_reto, diaActual]
    );

    res.json({
      reto: nuevoRetoDelDia,
      mensaje: "Nuevo reto asignado para el día de hoy"
    });
    
  } catch (error) {
    console.error("Error al obtener el reto diario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

app.get("/racha", async (req, res) => {
  const userId = req.query.userId;

  try {
    const rachaQuery = await pool.query(
      `WITH fechas_distintas_reto_completado AS (
        SELECT DISTINCT fecha::date FROM usuarios_retocompletado WHERE id_usuario = $1 AND completado = true
      ),
      fechas_con_rownumber AS (
        SELECT
          fecha,
          ROW_NUMBER() OVER (ORDER BY fecha) AS rn
        FROM fechas_distintas_reto_completado
      ),
      grupos AS (
        SELECT
          fecha,
          fecha - (rn || ' days')::interval AS grupo
        FROM fechas_con_rownumber
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
      SELECT dias AS racha_actual
      FROM racha_actual;
      `,
      [userId]
    );

    const racha = rachaQuery.rows[0]?.racha_actual || 0;
    res.json({ racha });

  } catch (error) {
    console.error("Error al obtener la racha:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

app.post("/completar-reto-diario", async (req, res) => {
  const {idUsuarioReto} = req.body;
  console.log("idusuarioreto", idUsuarioReto);

  try{
    await pool.query(
      "UPDATE usuarios_retocompletado SET completado = true WHERE id_usuario_reto = $1",
      [idUsuarioReto]
    );

  } catch (error) {
    console.error("Error al completar el reto diario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }

});


https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor HTTPS en ejecución en https://localhost:${PORT}`);
});
