const USERS = require('./users-model');
const db = require('../data/db-config');

describe('users model', function() {

    describe('test environment', function() {
        it('should use the testing environment', function() {
            expect(process.env.DB_ENV).toBe('testing')
        })
    })

    beforeEach(async function() {
        await db('users').truncate();
    })

    describe('add()', function() {
        it('adds user to db', async function() {
            await USERS.add({
                username: 'cody', 
                password: 'russell', 
                department: 'development'
            });
            const users = await db('users')
            expect(users).toHaveLength(1);
        })
    })

    describe('find()', function() {
        it('finds all users in db', async function() {
            await USERS.add({
                username: 'cody', 
                password: 'russell', 
                department: 'development'
            });
            await USERS.add({
                username: 'mutch', 
                password: 'mustmeans', 
                department: 'sales'
            });
           
            const users = await USERS.find()
            expect(users).toHaveLength(2);
        })
    })

    describe('findById()', function() {
        it('finds user by id from db', async function() {
            await USERS.add({
                username: 'cody', 
                password: 'russell', 
                department: 'development'
            });
            await USERS.add({
                username: 'mutch', 
                password: 'mustmeans', 
                department: 'sales'
            });
           
            const user = await USERS.findById(2)
            expect(user.username).toBe('mutch');
        })
    })

    describe('findBy(prop)', function() {
        it('finds user by property from db', async function() {
            await USERS.add({
                username: 'cody', 
                password: 'russell', 
                department: 'development'
            });
            await USERS.add({
                username: 'mutch', 
                password: 'mustmeans', 
                department: 'sales'
            });
           
            const user = await USERS.findById(2)
            expect(user.username).toBe('mutch');
        })
    })

    describe('remove()', function() {
        it('deletes user from db', async function() {
            await USERS.add({
                username: 'cody', 
                password: 'russell', 
                department: 'development'
            });
            await USERS.add({
                username: 'mutch', 
                password: 'mustmeans', 
                department: 'sales'
            });
            await USERS.remove(2)

            const users = await db('users')
            expect(users).toHaveLength(1);
        })
    })

    describe('edit()', function() {
        it('edits user in db', async function() {
            await USERS.add({
                username: 'cody', 
                password: 'russell', 
                department: 'development'
            });
            await USERS.edit(1, ({
                username: 'mutch', 
                password: 'mustmeans', 
                department: 'sales'
            }));

            const user = await USERS.findById(1)
            expect(user.username).toBe('mutch');
            expect(user.password).toBe('mustmeans');
            expect(user.department).toBe('sales');
        })
    })

})

