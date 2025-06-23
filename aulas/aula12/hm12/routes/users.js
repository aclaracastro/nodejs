const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const db = require('../db'); 

router.get('/', async (req, res) => {
  try {
    const usuarios = await db.any('SELECT * FROM usuario_imc ORDER BY id ASC');
    res.render('users', {
      title: 'Lista de Usuários',
      usuarios
    });
  } catch (error) {
    console.error('Erro ao buscar lista de usuários:', error);
    res.status(500).send('Erro ao carregar a lista de usuários');
  }
});

module.exports = router;
