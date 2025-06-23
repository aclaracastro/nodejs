const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const { check, validationResult } = require('express-validator');
const requireLogin = require('../routes/middlewares/auth');


router.get('/create', requireLogin, async (req, res) => {
  try {
    const usuarios = await db.any('SELECT id, nome FROM usuario WHERE ativo = true');
    const postagens = await db.any('SELECT id, titulo FROM postagem WHERE ativo = true');
    res.render('comentario/create', { usuarios, postagens });
  } catch (error) {
    res.render('comentario/create', { error: 'Erro ao carregar dados' });
  }
});

router.post('/create', [
  check('descricao').notEmpty().withMessage('Descrição é obrigatória'),
  check('cod_usuario').notEmpty().withMessage('Usuário é obrigatório'),
  check('cod_postagem').notEmpty().withMessage('Postagem é obrigatória')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const usuarios = await db.any('SELECT id, nome FROM usuario WHERE ativo = true');
    const postagens = await db.any('SELECT id, titulo FROM postagem WHERE ativo = true');
    return res.render('comentario/create', { usuarios, postagens, errors: errors.array() });
  }

  const { descricao, cod_usuario, cod_postagem } = req.body;
  const id = uuidv4();
  
  try {
    await db.none(
      'INSERT INTO comentario(id, descricao, dt_cadastro, ativo, cod_postagem, cod_usuario) VALUES($1, $2, $3, $4, $5, $6)',
      [id, descricao, new Date(), true, cod_postagem, cod_usuario]
    );
    res.redirect(`/comentario/${id}`);
  } catch (error) {
    const usuarios = await db.any('SELECT id, nome FROM usuario WHERE ativo = true');
    const postagens = await db.any('SELECT id, titulo FROM postagem WHERE ativo = true');
    res.render('comentario/create', { usuarios, postagens, error: 'Erro ao criar comentário' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const comentario = await db.one('SELECT * FROM comentario WHERE id = $1', [req.params.id]);
    const usuario = await db.one('SELECT * FROM usuario WHERE id = $1', [comentario.cod_usuario]);
    const postagem = await db.one('SELECT * FROM postagem WHERE id = $1', [comentario.cod_postagem]);
    
    res.render('comentario/detalhes', { comentario, usuario, postagem });
  } catch (error) {
    res.status(404).send('Comentário não encontrado');
  }
});


module.exports = router;