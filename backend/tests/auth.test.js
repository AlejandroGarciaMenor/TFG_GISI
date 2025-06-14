const request = require('supertest');
const app = require('../app');

describe('Auth endpoints', () => {
    it('debería devolver token con credenciales válidas', async () => {
        const res = await request(app)
        .post('/auth/login')
        .send({ email: 'alejandro.garciamenor@usp.ceu.es', password: 'Alejandro_28' });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Código de verificación enviado');
    });

    it('debería fallar con credenciales inválidas', async () => {
        const res = await request(app)
        .post('/auth/login')
        .send({ email: 'usuario@test.com', password: 'incorrecta' });
        expect(res.statusCode).toBe(400);
    });

    it('debería dar error por fechanacimiento y contraseña', async () => {
        const res = await request(app)
        .post('/auth/register')
        .send({
            nombre: 'Usuario Test',
            fechanacimiento: '2008-01-01',
            genero: 'Masculino',
            email: `test${Date.now()}@test.com`, // cada prueba crea un email unico
            password: '1234'
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('La contraseña debe cumplir con los requisitos de seguridad.');
    });

    it('debería registrar un usuario nuevo correctamente', async () => {
        const res = await request(app)
        .post('/auth/register')
        .send({
            nombre: 'Usuario Test',
            fechanacimiento: '1990-01-01',
            genero: 'Masculino',
            email: `test${Date.now()}@test.com`,
            password: 'Password_123!'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Usuario registrado correctamente');
    });
});