const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();

const DB_USER = 'postgres';
const DB_PASSWORD = '123';
const DB_HOST = 'localhost';
const DB_PORT = 5432;  
const DB_NAME = 'cw1';
const db = pgp(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`); /*conexao com bd*/

let vlistaDados;

db.query('SELECT * FROM public.dadosfake')
    .then((data) => {
        vlistaDados = data; 
    })
    .catch((error) => {
        console.log('=================');
        console.error('DB ERROR:', error); // error message
        console.log('=================');
    });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dados', { 
    title: 'Lista de Dados Fake', 
    arr_dados: vlistaDados
    });
});

module.exports = router;
