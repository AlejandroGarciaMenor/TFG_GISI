const pool = require('../db/pool');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

require('dotenv').config();
const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // 32 bytes (256 bits)
const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');   // 16 bytes (128 bits)

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

// Configuración del servicio de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Registro de usuario
const register = async (req, res) => {
  const { nombre, fechanacimiento, genero, email, password } = req.body;

  if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$_!%*?&])[A-Za-z\d@$!%*?&_]{8,}$/)) {
    return res.status(400).json({ message: 'La contraseña debe cumplir con los requisitos de seguridad.' });
  }

  const emailEncriptado = encrypt(email);
  try {
    const existingUser = await pool.query('SELECT * FROM usuarios WHERE email = $1', [emailEncriptado]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Ya existe un usuario registrado con este correo.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO usuarios (nombre, fechanacimiento, genero, email, password) VALUES ($1, $2, $3, $4, $5)',
      [
        encrypt(nombre),
        fechanacimiento,
        encrypt(genero),
        encrypt(email),
        hashedPassword
      ]
    );

    res.json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error('Error en el registro:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Inicio de sesión
const login = async (req, res) => {
  const { email, password } = req.body;

  console.log('me ha llegado');
  try {

    const emailEncriptado = encrypt(email);

    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [emailEncriptado]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).send('Usuario no encontrado');
    }

    user.email = decrypt(user.email);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Contraseña incorrecta');
    }

    // Verificar si el 2FA está activado
    if (user.two_factor_activado) {
      const codigo = crypto.randomInt(100000, 999999).toString();
      const expiracion = new Date(Date.now() + 5 * 60 * 1000); // Código válido por 5 minutos

      // Guardar el código y la expiración en la base de datos
      await pool.query(
        'UPDATE usuarios SET two_factor_codigo = $1, two_factor_expiracion = $2 WHERE id = $3',
        [codigo, expiracion, user.id]
      );

      // Enviar el código al correo del usuario
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Código de verificación',
        text: `Tu código de verificación es: ${codigo}`,
      });

      return res.json({ message: 'Código de verificación enviado' });
    }

    // Si el 2FA no está activado, generar el token JWT directamente
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, nombre: user.nombre, id: user.id });
  } catch (err) {
    console.error('Error en el inicio de sesión:', err);
    res.status(500).send('Error en el servidor');
  }
};

// Verificar el código de 2FA
const verificarCodigo2FA = async (req, res) => {
  const { email, codigo } = req.body;

  const emailEncriptado = encrypt(email);

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [emailEncriptado]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).send('Usuario no encontrado');
    }

    if (user.two_factor_codigo !== codigo) {
      return res.status(400).send('El código es incorrecto');
    }

    if (new Date() > user.two_factor_expiracion) {
      return res.status(400).send('El código ha expirado');
    }

    // Código válido, limpiar los datos de 2FA y generar un token JWT
    await pool.query(
      'UPDATE usuarios SET two_factor_codigo = null, two_factor_expiracion = null WHERE id = $1',
      [user.id]
    );

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    user.nombre = decrypt(user.nombre);
	  res.json({ token, nombre: user.nombre, id: user.id });
  } catch (err) {
    console.error('Error al verificar el código de 2FA:', err);
    res.status(500).send('Error en el servidor');
  }
};

module.exports = {
  register,
  login,
  verificarCodigo2FA,
};
