const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();

const DB_USER = 'postgres';
const DB_PASSWORD = '123';
const DB_HOST = 'localhost';
const DB_PORT = 5432;  
const DB_NAME = 'cw1';
const db = pgp(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`); /*conexao com bd*/

let vlistaclientes;

db.query('SELECT * FROM public.clientes')
    .then(data => {
        console.log('DATA: ',data.value); // 123
    })
    .catch((error) => {
        console.log('=================');
        console.error('DB ERROR:', error); // error message
        console.log('=================');
    });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('clientes', { 
    title: 'Lista de Clientes', 
    arr_clientes: vlistaclientes 
    });
});

module.exports = router;
