const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', [
  check('email').isEmail().withMessage('E-mail inválido'),
  check('senha').notEmpty().withMessage('Senha é obrigatória')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('login', { errors: errors.array(), valores: req.body });
  }

  const { email, senha } = req.body;

  try {
    const usuario = await db.oneOrNone('SELECT * FROM usuario WHERE email = $1 AND ativo = true', [email]);

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.render('login', { error: 'E-mail ou senha inválidos', valores: req.body });
    }

    req.session.usuario = { id: usuario.id, nome: usuario.nome };
    req.flash('success', 'Login realizado com sucesso');
    res.redirect('/');
  } catch (error) {
    console.error('Erro no login:', error);
    res.render('login', { error: 'Erro interno ao realizar login', valores: req.body });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;
