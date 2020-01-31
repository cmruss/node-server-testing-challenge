const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secret');

const USERS = require('../users/users-model');

//** ENDPOINT: /api/auth **//

router.post('/register', (req, res) => {
    console.log(req.body);
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    USERS.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: 'Could not add user.' })
        });
});

router.post('/login', (req, res) => {
    console.log(req.body)
    let { username, password } = req.body;

    USERS.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = signToken(user);
                res.status(200).json({ token });
            } else {
                res.status(401).json({ errorMessage: 'Invalid credentials.'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

function signToken(user) {
    const payload = {
        userId : user.id,
        username: user.username,
        department: user.department
    };

    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, jwtSecret, options);
};

module.exports = router;