const request = require('supertest');
const app = require('../server');

describe('CRUD Operations', () => {
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
            const res = await request(app)
                .put('/api/contacts/1')
                .send({ firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('should delete a contact', async () => {
            const res = await request(app).delete('/api/contacts/1');
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });

    describe('Projects', () => {
        it('should create a project', async () => {
            const res = await request(app)
                .post('/api/projects')
                .send({ name: 'Project A', description: 'Description of Project A' });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('should retrieve all projects', async () => {
            const res = await request(app).get('/api/projects');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should update a project', async () => {
            const res = await request(app)
                .put('/api/projects/1')
                .send({ name: 'Updated Project A', description: 'Updated description' });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('should delete a project', async () => {
            const res = await request(app).delete('/api/projects/1');
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });

    describe('Services', () => {
        it('should create a service', async () => {
            const res = await request(app)
                .post('/api/services')
                .send({ name: 'Service A', description: 'Description of Service A' });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('should retrieve all services', async () => {
            const res = await request(app).get('/api/services');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should update a service', async () => {
            const res = await request(app)
                .put('/api/services/1')
                .send({ name: 'Updated Service A', description: 'Updated description' });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('should delete a service', async () => {
            const res = await request(app).delete('/api/services/1');
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });

    describe('Users', () => {
        it('should create a user', async () => {
            const res = await request(app)
                .post('/api/users')
                .send({ username: 'user1', password: 'password123' });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('should retrieve all users', async () => {
            const res = await request(app).get('/api/users');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('should update a user', async () => {
            const res = await request(app)
                .put('/api/users/1')
                .send({ username: 'updatedUser1', password: 'newPassword123' });
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('should delete a user', async () => {
            const res = await request(app).delete('/api/users/1');
            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });
});