const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

router.get('/create', (req, res) => {
  res.render('usuario/create');
});

router.post('/create', [
  check('nome').notEmpty().trim().withMessage('Nome é obrigatório'),
  check('email').isEmail().normalizeEmail().withMessage('E-mail inválido'),
  check('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('usuario/create', {
      errors: errors.array(),
      valores: req.body
    });
  }

  const { nome, email, senha } = req.body;
  const id = uuidv4();
  const saltRounds = 10;

  try {
    const usuarioExistente = await db.oneOrNone('SELECT id FROM usuario WHERE email = $1', [email]);
    if (usuarioExistente) {
      return res.render('usuario/create', {
        error: 'E-mail já cadastrado',
        valores: req.body
      });
    }

    const senhaHash = await bcrypt.hash(senha, saltRounds);

    await db.none(
      'INSERT INTO usuario(id, nome, email, senha, dt_cadastro, ativo) VALUES($1, $2, $3, $4, $5, $6)',
      [id, nome, email, senhaHash, new Date(), true]
    );

    req.flash('success', 'Usuário cadastrado com sucesso!');
    res.redirect('/');

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.render('usuario/create', {
      error: 'Erro interno ao processar cadastro',
      valores: req.body
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const usuario = await db.one('SELECT * FROM usuario WHERE id = $1', [req.params.id]);
    res.render('usuario/detalhes', { usuario });
  } catch (error) {
    res.status(404).send('Usuário não encontrado');
  }
});

module.exports = router;