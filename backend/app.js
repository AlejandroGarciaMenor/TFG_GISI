require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const cuestionariosRoutes = require('./routes/cuestionariosRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const userRoutes = require('./routes/userRoutes');
const retoDiarioRoutes = require('./routes/retoDiarioRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const path = require('path');
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/auth', authRoutes);
app.use('/cuestionarios', cuestionariosRoutes);
app.use('/chatbot', chatbotRoutes);
app.use('/user', userRoutes);
app.use('/reto-diario', retoDiarioRoutes);

app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente en HTTP');
});

module.exports = app;