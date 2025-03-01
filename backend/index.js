require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

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
    
    try {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
    } catch (err) {
      res.status(500).send("Error al generar el token");
    }
      
  } catch (err) {
    console.error(err);
    res.status(500).send("Error en el servidor");
  }
});


// inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});