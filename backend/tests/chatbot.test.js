// tests/chatbot.test.js
const request = require('supertest');
const app = require('../app');
const password = process.env.USER_PW

let token;
let userId = 31; // ID de un usuario de pruebas válido

beforeAll(async () => { // Simula login y obtenemos el token
  const res = await request(app)
    .post('/auth/login')
    .send({ email: 'test@test.es', password: password });
    // ESTE USUARIO NO TIENE ACTIVADO EL DOBLE FACTOR DE AUTENTICACIÓN
    console.log('LOGIN RESPONSE:', res.body); 
    token = res.body.token;
    userId = res.body.id;
});

describe('Chatbot endpoints', () => {
  it('debería responder a un mensaje del usuario', async () => {
    const res = await request(app)
      .post('/chatbot/chatbot-conversacion')
      .set('Authorization', `Bearer ${token || 'token_de_prueba'}`) // Usa el token real si lo tienes
      .send({ input: 'Hola, tengo ansiedad', user_id: userId });
    expect(res.statusCode).toBe(200);
    expect(res.body.respuesta).toBeDefined();
  });

  it('debería rechazar la petición si falta el token', async () => {
    const res = await request(app)
      .post('/chatbot/chatbot-conversacion')
      .send({ input: 'Hola', user_id: userId });
    expect(res.statusCode).toBe(401);
  });
});