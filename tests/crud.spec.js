const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

// Generate a valid ObjectId for testing
const generateObjectId = () => new mongoose.Types.ObjectId();

describe('CRUD Operations', () => {
    let server;

    beforeAll(async () => {
        server = app.listen(4000); // Use a different port to avoid conflicts
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase(); // Clear database after tests
        await server.close();
        await mongoose.connection.close();
    });

    describe('Contacts', () => {
        it('should create a contact', async () => {
            const res = await request(app)
                .post('/api/contacts')
                .send({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('should retrieve all contacts', async () => {
            const res = await request(app).get('/api/contacts');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should update a contact', async () => {
            const id = generateObjectId();
            await request(app).post('/api/contacts').send({ _id: id, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });
            const res = await request(app)
                .put(`/api/contacts/${id}`)
                .send({ firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('should delete a contact', async () => {
            const id = generateObjectId();
            await request(app).post('/api/contacts').send({ _id: id, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });
            const res = await request(app).delete(`/api/contacts/${id}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });

    describe('Projects', () => {
        it('should create a project', async () => {
            const res = await request(app)
                .post('/api/projects')
                .send({ title: 'Project A', description: 'Description of Project A' });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('should retrieve all projects', async () => {
            const res = await request(app).get('/api/projects');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should update a project', async () => {
            const id = generateObjectId();
            await request(app).post('/api/projects').send({ _id: id, title: 'Project A', description: 'Description of Project A' });
            const res = await request(app)
                .put(`/api/projects/${id}`)
                .send({ title: 'Updated Project A', description: 'Updated description' });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('should delete a project', async () => {
            const id = generateObjectId();
            await request(app).post('/api/projects').send({ _id: id, title: 'Project A', description: 'Description of Project A' });
            const res = await request(app).delete(`/api/projects/${id}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });

    describe('Services', () => {
        it('should create a service', async () => {
            const res = await request(app)
                .post('/api/services')
                .send({ title: 'Service A', description: 'Description of Service A' });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('should retrieve all services', async () => {
            const res = await request(app).get('/api/services');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should update a service', async () => {
            const id = generateObjectId();
            await request(app).post('/api/services').send({ _id: id, title: 'Service A', description: 'Description of Service A' });
            const res = await request(app)
                .put(`/api/services/${id}`)
                .send({ title: 'Updated Service A', description: 'Updated description' });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('should delete a service', async () => {
            const id = generateObjectId();
            await request(app).post('/api/services').send({ _id: id, title: 'Service A', description: 'Description of Service A' });
            const res = await request(app).delete(`/api/services/${id}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });

    describe('Users', () => {
        it('should create a user', async () => {
            const res = await request(app)
                .post('/api/users')
                .send({ username: 'user1', password: 'password123', email: 'user1@example.com' });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('should retrieve all users', async () => {
            const res = await request(app).get('/api/users');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should update a user', async () => {
            const id = generateObjectId();
            await request(app).post('/api/users').send({ _id: id, username: 'user1', password: 'password123', email: 'user1@example.com' });
            const res = await request(app)
                .put(`/api/users/${id}`)
                .send({ username: 'updatedUser1', password: 'newPassword123', email: 'updated@example.com' });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('should delete a user', async () => {
            const id = generateObjectId();
            await request(app).post('/api/users').send({ _id: id, username: 'user1', password: 'password123', email: 'user1@example.com' });
            const res = await request(app).delete(`/api/users/${id}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });
});