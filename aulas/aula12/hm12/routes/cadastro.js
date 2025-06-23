const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const usuarios = await db.any('SELECT * FROM usuario_imc');
    res.render('cadastro', { 
      title: 'Cadastro de Usuários',
      usuarios
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).send('Erro ao carregar a página');
  }
});

router.post('/', async (req, res) => {
  const { nome, email, peso, altura } = req.body;

  if (!nome || !email || !peso || !altura) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  try {
    await db.none(
      'INSERT INTO usuario_imc(nome, email, peso, altura) VALUES($1, $2, $3, $4)',
      [nome, email, parseInt(peso), parseInt(altura)]
    );
     res.render('cadastro', {
      title: 'Cadastro de Usuários',
      verificacao: true,
      message: 'Usuário cadastrado com sucesso!'
    });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.render('cadastro', {
      title: 'Cadastro de Usuários',
      verificacao: false,
      message: 'Erro ao cadastrar usuário. Tente novamente.'
    });
  }
});

module.exports = router;
