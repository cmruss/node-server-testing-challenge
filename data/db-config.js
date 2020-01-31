// People all try to put me down, just because I config around, 
// I ain't trying to cause a big sensation, I'm just database-configuratin'
// Talkin' 'bout configuration, database configuration

const knex = require('knex');

const knexConfig = require('../knexfile');

module.exports = knex(knexConfig.development);