const pgp = require('pg-promise')();

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'app_blog',
  user: 'postgres',
  password: '123' 
});

module.exports = db;