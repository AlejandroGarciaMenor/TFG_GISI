require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const cuestionariosRoutes = require('./routes/cuestionariosRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const userRoutes = require('./routes/userRoutes');
const retoDiarioRoutes = require('./routes/retoDiarioRoutes');

const app = express();
const PORT = process.env.SERVER_PORT || 5000;
const IP = process.env.SERVER_IP || 'localhost'; 

// Middlewares
app.use(cors());
app.use(express.json());

const path = require('path');
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas
app.use('/auth', authRoutes); // Rutas de autenticación
app.use('/cuestionarios', cuestionariosRoutes); // Rutas de cribado
app.use('/chatbot', chatbotRoutes); // Rutas del chatbot
app.use('/user', userRoutes); // Rutas del usuario
app.use('/reto-diario', retoDiarioRoutes); // Rutas de retos diarios

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente en HTTP');
});

// Iniciar el servidor HTTP
app.listen(PORT, () => {
  console.log(`Servidor HTTP en ejecución en http://${IP}:${PORT}`);
});