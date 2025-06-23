const express = require('express');
const router = express.Router();
const db = require('../db');
const { comparePasswords } = require('../bcrypt');

router.get('/', (req, res) => {
  res.render('login', {
    title: 'Login de Usuários',
    success: req.query.success,
    error: null
  });
});

router.post('/', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).render('login', {
      title: 'Login de Usuários',
      error: 'E-mail e senha são obrigatórios.'
    });
  }

  try {
    const usuario = await db.oneOrNone('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (!usuario) {
      return res.status(401).render('login', {
        title: 'Login de Usuários',
        error: 'E-mail ou senha incorretos'
      });
    }

    const senhaValida = await comparePasswords(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).render('login', {
        title: 'Login de Usuários',
        error: 'E-mail ou senha incorretos'
      });
    }

    res.render('perfil', {
      title: 'Perfil do Usuário',
      usuario
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).render('login', {
      title: 'Login de Usuários',
      error: 'Erro ao fazer login. Tente novamente.'
    });
  }
});

module.exports = router;