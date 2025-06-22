require('dotenv').config();

module.exports = {
  // Hook que se ejecuta antes de cada escenario
  async beforeScenario(context, ee) {
    const axios = require('axios');
    try {
      // Login para obtener el JWT de usuario sin 2FA
      const res = await axios.post('https://tfg-app.xyz/auth/login', {
        email: 'test@test.es',
        password: process.env.USER_PW,
      });
      context.vars.jwt = res.data.token;
      context.vars.userId = res.data.id;
    } catch (err) {
      console.error('Error obteniendo JWT:', err.message);
    }
  }
};
