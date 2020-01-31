const request = require('supertest');
const server = require('./server');

describe('server', function() {
    it('runs the tests', function() {
        expect(true).toBe(true);
    })
})

describe('GET /api', function() {
    it('should return connection message', function() {
        return request(server).get('/api').then(res => {
            expect(res.type).toMatch(/html/i)
        })
    })
})

describe('GET /api/users', function() {
    it('should return response status 401', function() {
        return request(server).get('/api/users').then(res => {
            expect(res.status).toBe(401)
            expect(res.type).toMatch(/json/i)
            expect(res.body.message).toBe('You shall not pass!')
        })
    })
})

describe('POST /api/auth/register', function() {
    it('should post user to the database', function() {
        return request(server).post('/api/auth/register')
        .send({
            name: 'name',
            password: 'password',
            department: 'department'
        })
        .then(res => {
            expect(res.status).toBe(201)
            expect(res.type).toMatch(/json/i)
            expect(res.body).toHaveProperty('id')
            expect(res.body.name).toBe('name')
            expect(res.body.password).toBe('password')
            expect(res.body.department).toBe('departmet')
        })
    })
})