require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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

app.post("/chatbot", async (req, res) => {
  const { input } = req.body;
  console.log("Mensaje del usuario para el chatbot recibido en backend:", input);
  const respuesta = "Hola, soy un chatbot";
  res.json({ respuesta });
});

https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor HTTPS en ejecución en https://localhost:${PORT}`);
});
