const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
require('dotenv').config();

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function crearUsuarios() {
  const password = 'Password_123!';
  const hashedPassword = await bcrypt.hash(password, 10);

  for (let i = 1; i <= 25; i++) {
    const nombre = `TestUser${i}`;
    const fechanacimiento = '2000-01-01';
    const genero = 'Otro';
    const email = `testuser${i}@tfg-gisi.xyz`;

    try {
      await pool.query(
        'INSERT INTO usuarios (nombre, fechanacimiento, genero, email, password, two_factor_activado) VALUES ($1, $2, $3, $4, $5, $6)',
        [
          encrypt(nombre),
          fechanacimiento,
          encrypt(genero),
          encrypt(email),
          hashedPassword,
          true // Activa 2FA
        ]
      );
      console.log(`Usuario ${email} creado`);
    } catch (err) {
      if (err.code === '23505') {
        console.log(`Usuario ${email} ya existe`);
      } else {
        console.error(`Error creando ${email}:`, err);
      }
    }
  }
  await pool.end();
}

crearUsuarios();