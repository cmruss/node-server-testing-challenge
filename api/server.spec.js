const request = require('supertest');
const server = require('./server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { signToken } = require('../auth/auth-router');
const { jwtSecret } = require('../config/secret');


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
            username: 'name',
            password: 'password',
            department: 'department'
        })
        .then(res => {
            expect(res.status).toBe(201)
            expect(res.type).toMatch(/json/i)
            expect(res.body).toHaveProperty('id')
            expect(res.body.username).toBe('name')
            let user = res.body;
            const hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;
            expect(res.body.password).toEqual(hash)
            expect(res.body.department).toBe('department')
        })
    })
})

describe('POST /api/auth/login', function() {
    it('should post user to the database and return token', function() {
        return request(server).post('/api/auth/login')
        .send({
            username: 'name',
            password: 'password',
        })
        .then(res => {
            expect(res.type).toMatch(/json/i)
            expect(res.body).toHaveProperty('token')
            let response = jwt.verify(res.body.token, jwtSecret)
            console.log(response)
            expect(response.username).toBe('name')
            expect(response.userId).toBe(2)
        })
    })
})

describe('GET /api/users', function() {
    it('should return users', function() {
        let token = signToken({
            userId : 2,
            username: 'name',
            department: 'department'
        })
        return request(server).get('/api/users')
        .set({
            authorization: token
        })
        .then(res => {
          
            console.log(res.body)
            expect(res.status).toBe(200)
            expect(res.type).toMatch(/json/i)
            expect(res.body[0]).toHaveProperty('id')
            expect(res.body[0].username).toBe('name')
            let user = res.body;
            let password = 'password'
            const hash = bcrypt.hashSync(password, res.body[0].password);
            user.password = hash;
            expect(res.body[0].password).toBe(hash)
            expect(res.body[0].department).toBe('department')
        })
    })
})