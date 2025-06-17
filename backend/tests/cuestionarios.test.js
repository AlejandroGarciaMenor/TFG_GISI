// tests/cuestionarios.test.js
const request = require('supertest');
const app = require('../app');
const password = process.env.USER_PW

let token;

beforeAll(async () => {
  const res = await request(app)
    .post('/auth/login')
    .send({ email: 'test@test.es', password: password });
    // ESTE USUARIO NO TIENE ACTIVADO EL DOBLE FACTOR DE AUTENTICACIÓN
    token = res.body.token;
    userId = res.body.id;
});

describe('Cuestionarios endpoints', () => {
  it('debería iniciar una sesión de cribado', async () => {
    const res = await request(app)
      .post('/cuestionarios/iniciar-sesion-cribado')
      .set('Authorization', `Bearer ${token || 'token_de_prueba'}`)
      .send({ userId });
    expect(res.statusCode).toBe(200);
    // Puede devolver idSesion o idSesionNueva según si existe o no
    expect(res.body.idSesion || res.body.idSesionNueva).toBeDefined();
  });

  it('debería guardar respuestas del cribado', async () => {
    // Primero inicia una sesión para obtener el idSesion
    const sesionRes = await request(app)
      .post('/cuestionarios/iniciar-sesion-cribado')
      .set('Authorization', `Bearer ${token || 'token_de_prueba'}`)
      .send({ userId });
    const idSesion = sesionRes.body.idSesion || sesionRes.body.idSesionNueva;

    const res = await request(app)
      .post('/cuestionarios/guardar-respuestas')
      .set('Authorization', `Bearer ${token || 'token_de_prueba'}`)
      .send({
        idSesion,
        respuestas: { 1: 3, 2: 2, 3: 4 } // Ejemplo de respuestas
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Respuestas guardadas correctamente');
  });
});