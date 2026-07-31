import assert from 'node:assert/strict';
import test from 'node:test';
import request from 'supertest';

import app from '../src/app.js';
import connectDB from '../src/config/db.js';
import Profesor from '../src/models/profesor.model.js';

process.env.MONGO_URI =
    process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/academia-api-test';

const api = request(app);
const existingId = '507f191e810c19729de860ea';

const profesorData = {
    nombre: 'Ana López',
    email: 'ana.lopez@example.com',
    especialidad: 'Matemáticas',
    experiencia: 8,
};

const updatedProfesorData = {
    nombre: 'Ana López',
    email: 'ana.lopez@example.com',
    especialidad: 'Física',
    experiencia: 10,
};

test.describe('Profesores API', () => {
    test.before(async () => {
        await connectDB();
    });

    test.beforeEach(async () => {
        await Profesor.deleteMany();
    });

    test.after(async () => {
        await Profesor.deleteMany();
        await Profesor.db.close();
    });

    test('POST /profesores crea un profesor válido', async () => {
        const response = await api
            .post('/profesores')
            .send(profesorData)
            .expect(201)
            .expect('Content-Type', /json/);

        assert.equal(response.body.nombre, profesorData.nombre);
        assert.equal(response.body.email, profesorData.email);
        assert.equal(response.body.especialidad, profesorData.especialidad);
        assert.equal(response.body.experiencia, profesorData.experiencia);
    });

    test('GET /profesores devuelve la lista de profesores', async () => {
        await Profesor.create(profesorData);

        const response = await api
            .get('/profesores')
            .expect(200)
            .expect('Content-Type', /json/);

        assert.equal(response.body.length, 1);
        assert.equal(response.body[0].email, profesorData.email);
    });

    test('GET /profesores/:id devuelve un profesor existente', async () => {
        const profesor = await Profesor.create(profesorData);

        const response = await api
            .get(`/profesores/${profesor._id}`)
            .expect(200)
            .expect('Content-Type', /json/);

        assert.equal(response.body._id, profesor.id);
        assert.equal(response.body.nombre, profesorData.nombre);
    });

    test('PUT /profesores/:id actualiza un profesor existente', async () => {
        const profesor = await Profesor.create(profesorData);

        const response = await api
            .put(`/profesores/${profesor._id}`)
            .send(updatedProfesorData)
            .expect(200)
            .expect('Content-Type', /json/);

        assert.equal(
            response.body.especialidad,
            updatedProfesorData.especialidad,
        );
        assert.equal(
            response.body.experiencia,
            updatedProfesorData.experiencia,
        );
    });

    test('DELETE /profesores/:id elimina un profesor existente', async () => {
        const profesor = await Profesor.create(profesorData);

        const response = await api
            .delete(`/profesores/${profesor._id}`)
            .expect(200)
            .expect('Content-Type', /json/);

        assert.equal(response.body.message, 'Profesor eliminado');

        const found = await Profesor.findById(profesor._id);
        assert.equal(found, null);
    });

    test('POST /profesores con datos inválidos devuelve 400', async () => {
        const invalidProfesor = {
            nombre: '',
            email: 'invalid-email',
            especialidad: '',
        };

        const response = await api
            .post('/profesores')
            .send(invalidProfesor)
            .expect(400)
            .expect('Content-Type', /json/);

        assert.ok(Array.isArray(response.body));
        assert.ok(
            response.body.some(
                (message) =>
                    message.includes('obligatorio') ||
                    message.includes('válido'),
            ),
        );
    });

    test('PUT /profesores/:id con datos inválidos devuelve 400', async () => {
        const profesor = await Profesor.create(profesorData);

        const invalidUpdate = {
            experiencia: -5,
            email: 'no-es-un-email',
        };

        const response = await api
            .put(`/profesores/${profesor._id}`)
            .send(invalidUpdate)
            .expect(400)
            .expect('Content-Type', /json/);

        assert.ok(Array.isArray(response.body));
        assert.ok(
            response.body.some(
                (message) =>
                    message.includes('válido') || message.includes('negativa'),
            ),
        );
    });

    test('GET /profesores/:id con id inexistente devuelve 404', async () => {
        await api
            .get(`/profesores/${existingId}`)
            .expect(404)
            .expect('Content-Type', /json/);
    });

    test('PUT /profesores/:id con id inexistente devuelve 404', async () => {
        await api
            .put(`/profesores/${existingId}`)
            .send(updatedProfesorData)
            .expect(404)
            .expect('Content-Type', /json/);
    });

    test('DELETE /profesores/:id con id inexistente devuelve 404', async () => {
        await api
            .delete(`/profesores/${existingId}`)
            .expect(404)
            .expect('Content-Type', /json/);
    });
});
