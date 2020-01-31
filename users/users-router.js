const router = require('express').Router();

const USERS = require('./users-model');
const restricted = require('../auth/auth-middleware');

//** ENDPOINT /api/users */
router.get('/', restricted, (req, res) => {
    // console.log(req.user)
    USERS.findBy(req.user)
        .then(users => {
            res.json(users);
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;