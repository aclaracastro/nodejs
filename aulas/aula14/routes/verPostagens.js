const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const postagens = await db.any(`
      SELECT * FROM postagem 
      ORDER BY dt_cadastro DESC
    `);
    
    res.render('verPostagens', { 
      title: 'Todas as Postagens',
      postagens: postagens,
      usuario: req.user 
    });
  } catch (err) {
    console.error('Erro ao buscar postagens:', err);
    res.status(500).send('Erro ao carregar postagens');
  }

});

router.get('/:id', async (req, res) => {
  try {
    const postagem = await db.oneOrNone(`
      SELECT * FROM postagem 
      WHERE id = $1
    `, [req.params.id]);

    if (!postagem) {
      return res.status(404).send('Postagem não encontrada');
    }

    res.render('verPostagem', { 
      title: postagem.titulo,
      postagem: postagem
    });
  } catch (err) {
    console.error('Erro ao buscar postagem:', err);
    res.status(500).send('Erro ao carregar postagem');
  }
});

module.exports = router;