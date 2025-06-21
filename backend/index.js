const app = require('./app');
const PORT = process.env.SERVER_PORT || 5000;
const IP = '0.0.0.0';

app.listen(PORT, IP, () => {
  console.log(`Servidor HTTP en ejecución en http://${IP}:${PORT}`);
});
