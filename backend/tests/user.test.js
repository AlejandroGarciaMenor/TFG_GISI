// tests/user.test.js
const request = require('supertest');
const app = require('../app');
const password = process.env.USER_PW

describe('User endpoints', () => {
  let token;
  let userId;

  beforeAll(async () => {
  // Simula login y obtén el token (ajusta el email y password según tu usuario de pruebas)
  const res = await request(app)
    .post('/auth/login')
    .send({ email: 'test@test.es', password: password });
    // ESTE USUARIO NO TIENE ACTIVADO EL DOBLE FACTOR DE AUTENTICACIÓN
    console.log('LOGIN RESPONSE:', res.body); 
    token = res.body.token;
    userId = res.body.id;
  });

  it('debería devolver todos los datos relevantes del usuario descifrados para perfil usuario', async () => {
    const res = await request(app)
      .get('/user/usuario')
      .set('Authorization', `Bearer ${token}`)
      .query({ userId });
    expect(res.statusCode).toBe(200);

  expect(res.body.usuario).toHaveProperty('nombre');
  expect(res.body.usuario).toHaveProperty('email');
  expect(res.body.usuario).toHaveProperty('genero');
  expect(res.body.usuario).toHaveProperty('fechanacimiento');
  expect(res.body.usuario).toHaveProperty('foto_perfil');

  expect(res.body).toHaveProperty('puntuaciones_gravedad');
  expect(res.body).toHaveProperty('alerta_gravedad_severa');
  expect(res.body).toHaveProperty('resumenes_chatbot');
  expect(res.body).toHaveProperty('tipos_ansiedad_detectados');

  expect(Array.isArray(res.body.puntuaciones_gravedad)).toBe(true);
  expect(Array.isArray(res.body.resumenes_chatbot)).toBe(true);
  expect(Array.isArray(res.body.tipos_ansiedad_detectados)).toBe(true)
  });

  it('debería devolver 404 si el usuario no existe', async () => {
    const res = await request(app)
      .get('/user/usuario')
      .set('Authorization', `Bearer ${token}`)
      .query({ userId: 999999 });
    expect(res.statusCode).toBe(404);
  });

  it('debería actualizar los datos del usuario', async () => {
    const res = await request(app)
      .put('/user/usuario')
      .set('Authorization', `Bearer ${token}`)
      .field('user_id', userId)
      .field('nombre', `Nuevo Nombre${Date.now()}`)
      .field('email', `test@test.es`)
      .field('fechanacimiento', '1990-01-01')
      .field('genero', 'Otro');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Datos actualizados correctamente');
  });

});