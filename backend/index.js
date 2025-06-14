const app = require('./app');
const PORT = process.env.SERVER_PORT || 5000;
const IP = process.env.SERVER_IP || 'localhost';

app.listen(PORT, () => {
  console.log(`Servidor HTTP en ejecución en http://${IP}:${PORT}`);
});