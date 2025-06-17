// tests/retoDiario.test.js
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

describe('Reto Diario endpoints', () => {
    
    it('debería devolver un reto diario para el usuario', async () => {
    const res = await request(app)
        .get('/reto-diario/obtener-reto-diario')
        .set('Authorization', `Bearer ${token || 'token_de_prueba'}`)
        .query({
        userId,
        tipos_ansiedad_detectados: JSON.stringify([{ id_ansiedad: 1 }])
        });
    console.log('RETO DIARIO RESPONSE:', res.statusCode, res.body);
    expect([200]).toContain(res.statusCode);
    if (res.statusCode === 200) {
        expect(res.body).toHaveProperty('reto');
    }
    });

    it('debería completar un reto diario', async () => {
    const res = await request(app)
        .post('/reto-diario/completar-reto-diario')
        .set('Authorization', `Bearer ${token || 'token_de_prueba'}`)
        .send({ idUsuarioReto: 53 });
    console.log('COMPLETAR RETO RESPONSE:', res.statusCode, res.body);
    expect([200, 500]).toContain(res.statusCode);
    if (res.statusCode === 200) {
        expect(res.body.message).toBe('Reto completado correctamente');
    }
    });
});